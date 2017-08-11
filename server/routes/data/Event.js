const redis = require("../../../redis");
const client = redis.client;
const ListKey = 'EventIds';
const IDKey = 'EventID';
const moment = require('moment');

module.exports.getAll = (next) => {
    getIds((err, ids) => {
        if (err) {
            return next(err);
        }
        if (ids.length == 0) {
            return next(null, []);
        }
        toArray(ids, (err, events) => {
            if (err) {
                next(err);
            }
            events.sort(function(a,b) {
                let dateA = a.date.split("-");
                let dateB = b.date.split("-");
                if (dateA[2] == dateB[2]) {
                    if (dateA[0] == dateB[0]) {
                        console.log(dateA[2], dateB[2]);
                        if (dateA[1] == dateB[1]) {
                            return a.title > b.title;
                        } else {
                            return dateA[1] > dateB[1];
                        }
                    } else {
                        return dateA[0] > dateB[0];
                    }
                } else {
                    return dateA[2] > dateB[2];
                }
            });
            return next(null, events);
        });
    });
}

module.exports.create = (data, next) => {
    addToIds((err, id) => {
        if (err) {
            return next(err);
        }
        data._id = id;
        client.hmset(`event:${id}`, data, (err) => {
            if (err) {
                return next(err);
            }
            return next(null);
        })
    });
}

module.exports.update = (id, data, next) => {
    console.log(`event:${id}`);
    console.log(data);
    client.hmset(`event:${id}`, data, (err) => {
        if (err) {
            return next(err);
        }
        return next(null);
    })
}

module.exports.delete = (id, next) => {
    client.del(`event${id}`, (err) => {
        if (err) {
            return next(err);
        }
        client.lrem(ListKey, 1, id, (err) => {
            if (err) {
                return next(err);
            }
            return next(null);
        });
    })
}

function toArray(ids, next) {
    let tasks = [];
    ids.forEach((id) => {
        tasks.push((next) => {
            get(id, (err, event) => {
                if (err) {
                    return next(err);
                }
                return next(null, event);
            });
        });
    });
    paralellize(tasks, next);
}

function paralellize(tasks, next) {
    let completed = 0;
    let events = [];
    tasks.forEach((task) => {
        task((err, event) => {
            if (err) {
                return next(err);
            }
            events.push(event);
            if (++completed == tasks.length) {
                return next(null, events);
            }
        })
    })
}

function get(id, next) {
    client.hgetall(`event:${id}`, (err, event) => {
        if (err) {
            return next(err);
        }
        return next(null, event);
    })
}

function getId(next) {
    client.incr(IDKey, (err, id) => {
        if (err) {
            return next(err);
        }
        return next(null, id);
    });
}

function getIds(next) {
    client.lrange(ListKey, 0, -1, (err, data) => {
        if (err) {
            return next(err);
        }
        return next(null, data);
    });
}

function addToIds(next) {
    getId((err, id) => {
        if (err) {
            return next(err);
        }
        client.rpush(ListKey, id, (err) => {
            if (err) {
                return next(err);
            }
            return next(null, id);
        })
    });
}