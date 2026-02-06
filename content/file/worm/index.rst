Worm
====

:lang: en
:slug: file/worm
:tags: game, mini-binary

.. figure:: {static}icon.png
   :alt: Worm icon
   :width: 160
   :height: 120

* Download: `worm.gbf <{static}worm.gbf>`_
* Original Title: WORM
* Size: 8 Blocks_ (1816 bytes)
* Type: |diamond|
* Author: |author-kei-kondoh|_
* Origin: |mini-binary|, |gbkiss-link|
* `Creator Code`_: ``$00`` (none)

Description
-----------

A simple snake game. It uses text characters to represent the worm and playing field. This presumably saves storage space compared to including its own graphics.

Initially, the worm is 4 segments long. Each piece of food increases the length of the snake, up to a maximum of 80. The initial point value of food is 1, and eating food also increases the point value of food by 1, up to a maximum of 5. If the player takes more than 10 seconds to eat food, then the value is reset to 0. The maximum high score is thus 370 (1+2+3+4+5×72).

Images
------

Screenshots
~~~~~~~~~~~

.. container:: gallery

   .. figure:: {static}title.png
      :alt: Worm title screen
      :width: 160
      :height: 144

      Title screen

   .. figure:: {static}game.png
      :alt: Worm gameplay
      :width: 160
      :height: 144

      Gameplay

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
      :alt: Worm profile

      Worm profile (Famitsu Bros. 1998/02, p.91)

.. include:: ../../epilog.rsti
