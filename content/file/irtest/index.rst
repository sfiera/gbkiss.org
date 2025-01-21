IR Test
=======

:lang: en
:slug: file/irtest
:tags: app, homebrew

.. figure:: {static}icon.png
   :alt: IR Test icon
   :width: 160
   :height: 120

* Download: `irtest.gbf <{static}irtest.gbf>`_
* Original Title: IRTEST
* Size: 2 Blocks_ (355 bytes)
* Type: |circle|
* Author: |author-sfiera|_
* `Creator Code`_: ``$00``
* Source code: `irtest.asm <https://github.com/sfiera/gbkasm/blob/main/src/irtest/irtest.asm>`_

Description
-----------

This program demonstrates basic use of IR communication.

To use it, position two devices for IR communcation, then select RECV on one and SEND on the other. They will exchange the configured player name on each cart and display the remote player name.

If the sending device detects that the receiving device is running software other than IR Test, it will report a mismatch.

Images
------

Screenshots
~~~~~~~~~~~

.. container:: gallery

   .. figure:: {static}menu.png
      :alt: IR Test menu
      :width: 160
      :height: 144

      Menu

   .. figure:: {static}success.png
      :alt: IR Test success
      :width: 160
      :height: 144

      Success

   .. figure:: {static}info.png
      :alt: File info
      :width: 160
      :height: 144

      File info

.. include:: ../../epilog.rsti
