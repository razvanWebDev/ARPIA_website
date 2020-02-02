# ARPIA_website

[Live perview](https://razvanwebdev.github.io/ARPIA_website/index.html).
Website for Asociația Româna pentru Propaganda și Istoria Aeronauticii (A.R.P.I.A) - filiala Cluj.

### Add new event
```
1. Go to JSON/events.json and create a new event object. 
2. If the event has a poster, copy the poster inside img/events, resize it to 1920 px width, then make a copy of 500 px width and rename it to "name"_small and add the link for the small photo in your event object. 
```

### Add new foto album

```
1. Go to "img", create a new folder and rename it "day"_"month"_"year" and copy all the photos inside.
2. (Optional) resize all images to 1920 px width and rename them to "day"_"month"_"year"_## (## = number).
3. Create copies of the first 6 photos, resize them to 400 px width and rename them to "photoName"_small.
```
You can use a light software like [Infarnview](https://www.irfanview.com/), which you can download for free and follow these steps: 
Open an image, press "B", "Add all" pictures, check "Batch conversion - Rename result files", "Use Advanced options" -> "Advanced" and select the desired width in pixels. Change the "Name pattern", select the "Output folder" and click "Start Batch".
```
4. For better performance, minify your pictures (you can use tinyjpg.com).
5. To create the album cover, go to JSON/gallery_foto.json and create new album object and add the pictures ending in "small".
6. To add all the photos go the albun, co to "JSON" folder, create a new file and rename it "day"_"month"_"year" with src for every picture. In the first photo object insert the album name and all the details you have for the album.

```

### Add new video

```
Go to JSON/gallery_video.json and create new object just like the other ones in the array.If you wand the video to start and/or stop at a certain time, use "startTime": "start= time" or  "stopTime": "end=number", where "number" is the number o seconds you wand to use.
```

