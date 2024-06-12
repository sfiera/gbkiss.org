Bakechu Relay
=============

:lang: en
:slug: file/bakechu-relay
:tags: game, mini-kissmon

.. figure:: {static}icon.png
   :alt: Bakechu Relay icon
   :width: 160
   :height: 120

* Original Title: バケちゅリレー
* Size: 13 Blocks_ (3142 bytes)
* Type: |circle|
* Author: |author-tobi|_
* Source: |mini-kissmon|, |gbkiss-link|
* `Creator Code`_: ``$70`` (Bakechu Relay)
* File: `bakechu-relay.gbf <{static}bakechu-relay.gbf>`_

Description
-----------

Bakechu Relay is a multiplayer game of catch, played between two or more systems. The game flow is:

1. The first player chooses a “わたすーN” (“Pass—N”) option to set the target volley count.
2. The first player becomes the passing player.
3. The passing player moves and presses A to throw an object into the moving mouse hole.
4. The receiving player chooses “もらう” (“Receive”) to receive the object.
5. The two players position their games so that IR communication can proceed.
6. The receiving player moves their mouse to catch the object.
7. The receiving player becomes the new passing player.

Steps 3-7 repeat until the target volley count is reached. The receiving player can be a new player each time, or players can repeat. The first player can receive by exiting to the menu with Select and choosing “もらう” (“Receive”).

If the passing player misses the target, or the receiving player misses the catch, the volley fails. If the volley succeeds, the total volley time is reported.

The menu also includes two other options:

*  れんしゅう: practice passing and receiving
*  END: exit to Kiss Menu

Images
------

.. container:: gallery

   .. figure:: {static}menu.png
      :alt: Bakechu Relay main menu
      :width: 160
      :height: 144

      Main menu

   .. figure:: {static}game.png
      :alt: Bakechu Relay gameplay
      :width: 160
      :height: 144

      Gameplay

Trivia
------

The title of this game is a pun on “バケツリレー” (“Bucket Relay”), with the “tsu” swapped for “chu”, a mouse sound (compare Pikachu, ChuChu Rocket).

.. include:: ../../epilog.rsti
