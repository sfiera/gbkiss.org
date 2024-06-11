Saita Saita
===========

:lang: en
:slug: file/saita
:tags: app

.. figure:: {static}../icon/simula1.png
   :alt: Saita Saita icon
   :width: 160
   :height: 120

* Original Title: MUSIC.さいたさいた
* Size: 1 Block_ (77 bytes)
* Type: |triangle|
* Author: (anonymous)
* Source: Hudson website
* Creator Code: ``$76``
* File: `saita.gbf <{static}saita.gbf>`_

Description
-----------

This is a traditional Japanese folk song. The lyrics are:

   | さいた さいた (Saita, saita)
   | チュリップの花が (Tulip no hana ga)
   | 並んだ 並んだ (Naranda, naranda)
   | 赤 白 黄色 (Aka shiro ki-iro)
   | どの花見ても (Dono hana mite mo)
   | きれいだな (Kirei da na)

Content
-------

The file content decodes to the following

.. code-block:: text

   4d0000000e76                ; file header
   4d555349432e0fbbb2c0bbb2c0  ; file title: MUSIC.さいたさいた
   06                          ; alarm title length: 6 bytes
   6b62706b6270                ; alarm title: さいたさいた
   32                          ; pattern length: 50 bytes
   40f7                        ; unknown pattern start
   a7                          ; set middle octave
   3133358331333583            ; c d e r c d e r
   3835333133353383            ; g e d c d e d r
   3133358331333583            ; c d e r c d e r
   3835333133353183            ; g e d c d e c r
   383835383a3a3883            ; g g e g a a g r
   353533335183                ; e e d d c2 r
   b0                          ; unknown pattern end

.. include:: ../../epilog.rsti
