#Redis ImageList

## Theory

in redis galleries can be stored as an ordered list of images in order to keep
the order of images the same through out each website. The list should contain
img urls in order to change what images are stored in the galleries. Gallery key
should be a a name passed in form of html data-attribute

## Spec

- get all images
- set specific image
- add images
- remove images

```javascript
Psuedo Code

add value

	redis list lpush value

add value index

	previmg -> list lindex index

	reids list linsert value before previmg

set value

	...

```

## Testing

1. Get, get all the images stored in a list

2. Set, set specific index of list

3. Add, add images to end of list

4. Add, add at index

5. Remove, remove end of list

6. Remove, remove at index

## Stages

1. Start by setting up redis list

2. function for getting all images

3. function for adding image at the end

4. function for removing image at the end

5. function for adding at index

6. function for removing at index
