Kiss Menu
=========

:lang: en
:slug: file/menu

In the GBKiss menu, players can select files with the D-Pad and A. There are six options in the menu:

*  実行 (“Run”): execute software, or open data in the associated software
*  情報 (“Info”): show information about the selected file
*  整理 (“Organize”): move the selected file to a different position in the menu
*  送信 (“Send”): initiate sending_ the selected file to another cartridge
*  受信 (“Receive”): initiate receiving_ a file from another cartridge
*  削除 (“Delete”): delete the selected file

B exits GBKiss. Start starts receiving_ a file in the next empty slot. Holding down Select while using the D-Pad enables fast scrolling.

The GBKiss menu has slots for 120 files, but due to storage_ limits it is not possible to store that many files on most cartridges_.

.. _storage: {filename}/tech/storage.rst
.. _cartridges: {filename}/cart/index.rst

Transfer
--------

Sending
~~~~~~~

To send a file:

1. Select the file in the Kiss Menu.
2. Press A and choose the 4th option (“送信”, “Send”).
3. Position the Game Boy with the cartridge lined up with the receiver.
4. Press A to begin transfer.

Receiving
~~~~~~~~~

To receive a file:

1. Select a position in the file menu.
2. Press A and choose the 5th option (“受信”, “Receive”).
3. Position the Game Boy with the cartridge lined up with the sender.
4. Press A to begin transfer.

If the selected position already contains a file, that file will be overwritten. Alternately, Start directly enters receive mode and selects the next empty space automatically. This skips steps 1, 2, and 4 above.

Cancelling
~~~~~~~~~~

To abort an in-progress or failed transfer, press B. The receiving player may have an incomplete file marked with |cross|. This file cannot be used and should be deleted.

Images
------

Screenshots
~~~~~~~~~~~

.. container:: gallery

   .. figure:: {static}menu.png
      :alt: GBKiss menu
      :width: 160
      :height: 144

      GBKiss menu with 2 files

   .. figure:: {static}broken.png
      :alt: Broken link
      :width: 160
      :height: 144

      Broken link: data without app

   .. figure:: {static}info.png
      :alt: Software info screen
      :width: 160
      :height: 144

      Software info screen

   .. figure:: {static}send.png
      :alt: Start send screen
      :width: 160
      :height: 144

      Start send screen

   .. figure:: {static}fail.png
      :alt: Send fail screen
      :width: 160
      :height: 144

      Send fail screen

.. include:: ../../epilog.rsti
