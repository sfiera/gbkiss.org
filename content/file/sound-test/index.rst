Sound Test
==========

:lang: en
:slug: file/sound-test
:tags: app, mini-kissmon

.. figure:: {static}../icon/cat.png
   :alt: Sound Test icon
   :width: 160
   :height: 120

* Download: `soundtst.gbf <{static}soundtst.gbf>`_
* Original Title: サウンド　テスト
* Alternate Title: サウンド ルーム (“Sound Room”)
* Size: 4 Blocks_ (876 bytes)
* Type: |circle|
* Author: *Anonymous*
* Origin: |mini-kissmon|, |gbkiss-link|
* `Creator Code`_: ``$05`` (Sound Test)

Description
-----------

Sound Test plays back music and sound effects. Different music and sound is available depending on the cartridge: on a `Pocket Bomberman`_ cartridge it plays Bomberman music; on a `Nectaris GB`_ cartridge it plays Nectaris music. In addition, there are some common sound effects available across different cartridges.

.. _Pocket Bomberman: {filename}/cart/apoj/index.rst
.. _Nectaris GB: {filename}/cart/an5j/index.rst

There are six options:

*  MUSIC No.: chooses a music track from the cartridge. Press A to play music.
*  EFECT No.: chooses a sound effect from the cartridge. Press A to play sound.
*  OffChannel_: turns off one or more of the Game Boy’s 4 sound channels. Press A to change setting.
*  VOLUME: sets the global volume. Press A to change setting.
*  M_PAUSE: pauses music. Press A to pause or unpause.
*  VsyncTimer: unknown.

Below the menu, the current music state and sound effect state (play or stop) is shown.

OffChannel
~~~~~~~~~~

The OffChannel setting is interpreted as a binary bitfield, with 4 flags:

*  1: pulse channel 1; often melody
*  2: pulse channel 2; often harmony
*  4: wave channel 3; often bass
*  8: noise channel 4; often percussion

For example:

*  To hear all tracks, set to 0.
*  To disable percussion, set to 8 to turn off channel 4.
*  To hear only harmony, set to 13 (1 + 4 + 8) to turn off channels 1, 3, and 4.

Other Software
~~~~~~~~~~~~~~

If music is playing when Sound Test exits, it will continue playing in the menu and in other software that allows it to continue. The following is an incomplete list of software that supports this:

*  `Kiss Mail <{filename}../kiss-mail/index.rst>`_
*  `Puzzle Game <{filename}../puzzle-game/index.rst>`_
*  `Calculator <{filename}../calculator/index.rst>`_

Images
------

.. container:: gallery

   .. figure:: {static}title.png
      :alt: Sound Test title screen
      :width: 160
      :height: 144

      Title Screen

   .. figure:: {static}app.png
      :alt: Sound Test usage
      :width: 160
      :height: 144

      Usage

   .. figure:: {static}info.png
      :alt: File info
      :width: 160
      :height: 144

      File info

.. include:: ../../epilog.rsti
