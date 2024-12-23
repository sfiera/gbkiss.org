Watch & Timer
=============

:lang: en
:slug: file/watch-and-timer
:tags: app, mini-kissmon

.. figure:: {static}../icon/tokei.png
   :alt: Watch & Timer icon
   :width: 160
   :height: 120

* Download: `sw_timer.gbf <{static}sw_timer.gbf>`_
* Original Title: WATCH&TIMER
* Alternate Title: ストップウォッチ&タイマー (“Stopwatch & Timer”)
* Size: 9 Blocks_ (2055 bytes)
* Type: |circle|
* Author: |author-y-motosako|_
* Origin: |mini-kissmon|, |gbkiss-link|
* `Creator Code`_: ``$6a`` (Watch & Timer)

Description
-----------

Watch & Timer is a combination stopwatch_ and timer_.

By default, the clock digits are displayed with blocky numbers. If `Num0 Data`_ is installed, then launching Watch & Timer from that data file will change the digits to a rounded, stenciled appearance.

.. _Num0 Data: {filename}num0-data.rst
.. _Num0 LCD: {filename}num0-lcd.rst

Stopwatch
~~~~~~~~~

In Stopwatch mode, the controls are:

*  A: start or pause the stopwatch
*  B: mark a lap time (while running) or reset the stopwatch (while stopped)
*  Start: switch to Timer_ mode
*  Select: exit to menu

Timer
~~~~~

In timer mode, there are 6 programmable timers. The times are saved to the file, so they will be preserved across runs, and will be included with the software if the file is sent to another player. The controls are:

*  A: start or pause the stopwatch
*  B: cycle between timers (while stopped) or reset the timer (after started)
*  D-Pad: edit the selected time or alarm tone
*  Start: switch to Stopwatch_ mode
*  Select: exit to menu

In addition to the time, there are four alarm tones which can be selected after the decimal point:

1. A quick, high-pitched pulse
2. A repeated, lower-pitched pulse
3. A triple pulse, repeated 4 times
4. A doorbell sound, repeated 4 times

Images
------

Screenshots
~~~~~~~~~~~

.. container:: gallery

   .. figure:: {static}title.png
      :alt: Initial state
      :width: 160
      :height: 144

      Initial state

   .. figure:: {static}stopwatch.png
      :alt: Stopwatch in use
      :width: 160
      :height: 144

      Stopwatch in use

   .. figure:: {static}timer.png
      :alt: Timer in use
      :width: 160
      :height: 144

      Timer in use

   .. figure:: {static}data.png
      :alt: Appearance with Num0 Data
      :width: 160
      :height: 144

      Appearance when launched from `Num0 Data`_

   .. figure:: {static}lcd.png
      :alt: Appearance with Num0 LCD
      :width: 160
      :height: 144

      Appearance when launched from `Num0 LCD`_

   .. figure:: {static}info.png
      :alt: File info
      :width: 160
      :height: 144

      File info

Media
~~~~~

.. container:: gallery

   .. figure:: {static}profile.jpg
      :target: {static}profile.jpg
      :alt: Watch & Timer profile

      Watch & Timer profile (Famitsu Bros. 1997/12, p.67)

.. include:: ../../epilog.rsti
