# Perfect Scrollbar MxWidget

A Mendix Widget that wraps the popular javascript based scroll-bar perfect scroll - https://github.com/utatti/perfect-scrollbar

## Demo

https://7-8-0pscrolltest.mxapps.io/

## Why should I use this?

It can be styled and customized much more than the regular browser scroll.

## How to use it?

1. Add the widget to your project. (either from the appstore or by copying the mpk file into your project widgets directory)
2. On a page where you are showing a list view or a template view or just a large container with content, Wrap the content that you want to be scrollable with a div-container
3. Add the following css to the container 
``
position: relative;
width: 90%; //or 200px; 
overflow-x: hidden !important;//or overflow-y
``
The important thing is to keep the container size fixed in the direction you want to scroll. For horizntal scrolling the width should be fixed, while for vertical scrolling the height should be fixed. 
4. Inside this div container, preferably at the bottom place the "PerfectScrollbar" widget

## I don"t really like the default look/behaviour of the scroll?

Use the CustomSettings to change it. Perfect scrollbar provides a nice documentation of possibilities here: https://github.com/utatti/perfect-scrollbar#options

## But wait there is more...

You can programatically scroll to a certain position within the container to make sure that certain elements/widgets are in view when the user opens a page. Use the scrollTop and scrollLeft attributes to control this at runtime.

## Supported Mendix versions

I have directly tested 6.10.10, 7.5.1 and 7.8.0. I have no reason to believe it will not work for any 6 or 7 version.

## Known issues

...

