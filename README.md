# Move to Root

## Objective
This app moves all files in a directory tree to the root directory. In order to prevent of accidental deletion the file names will be updated with the folder directory path.

### File Name Conversion
File names will be convered as:
From: 	/Pictures/2020/06/06/image.jpg
To:		/Pictures/2020-06-06-image.jpg

## Usage
Update Root Directory
```JavaScript
	const rootDir = path.join('/home', 'User', 'Pictures');
````

Run npm start

## Use Case
This application was primarily written to facilitate back-up and uploading of photos to Google Photos. Google Photos - on the Linux system - does not allow recursive folder uploads. You can only select multiple files in a single directory. Having 10000+ picutres sorted in folders by camera, date, etc., uploading these folder by folder would result in a long and boring exercise. This script quickly puts all files in the root directory and allows for a single upload of images to Google Photos.


## License MIT

Copyright 2020 CMTr AS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.