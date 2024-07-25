Alarms
======

:lang: en
:slug: tech/alarm
:tags: tech

The `HuC-3 mapper`_ can play alarms at set times, with a selection of different programmable_ and built-in_ alarm tones. `Pocket Family GB`_ also supports a user-configured alarm and supports installing additional alarm tones through GBKiss.

.. _HuC-3 mapper: {filename}mapper.rst#huc-3
.. _Pocket Family GB: {filename}/cart/hfaj/index.rst

Built-in
--------

There are 16 (?) built-in alarm tones:

.. list-table::
   :widths: auto

   *  *  Nibble
      *  Alarm tone
   *  *  ``$0``
      *  Phone ring
   *  *  ``$1``
      *  Unknown
   *  *  ``$2``
      *  Alarm 1 (めざましおん1)
   *  *  ``$3``
      *  Doorbell 1 (ピンポン1)
   *  *  ``$4``
      *  Unknown
   *  *  ``$5``
      *  Unknown
   *  *  ``$6``
      *  Alarm 2 (めざましおん2)
   *  *  ``$7``
      *  Unknown
   *  *  ``$8``
      *  Unknown
   *  *  ``$9``
      *  Unknown
   *  *  ``$A``
      *  Unknown
   *  *  ``$B``
      *  Doorbell 3 (ピンポン3)
   *  *  ``$C``
      *  Unknown
   *  *  ``$D``
      *  Unknown
   *  *  ``$E``
      *  Doorbell 2 (ピンポン2)
   *  *  ``$F``
      *  Doorbell 4 (ピンポン4)

Programmable
------------

Three of the default alarms in `Pocket Family GB`_ are programmable:

*  Afterschool Chime
*  Silent Night
*  Ambulance

Hudson also distributed a single downloadable_ alarm, `Saita Saita <{filename}/file/saita/index.rst>`_, as a GBKiss file.

The 3 default programmable alarms are stored inside the ROM file:

.. code-block:: text

   07:5c40: 465c 985c 5b5c                           F\.\[\
      5c46:                1440 c2a7 3a36 3861 3138        .@..:68a18
   07:5c50: 3a76 83b0 0000 0000 0001 f6              :v.........
      5c5b:                            3c 4029 a748             <@).H
   07:5c60: 1a38 6548 1a38 655f 3f6c 5d3d 685a 3a4d  .8eH.8e_?l]=hZ:M
   07:5c70: 1c3a 481a 3865 5a3a 4d1c 3a48 1a38 65ad  .:H.8eZ:M.:H.8e.
   07:5c80: 5333 4613 3061 65a7 3d38 3548 1633 3135  S3F.0ae.=85H.315
   07:5c90: 387d b000 0000 03f6
      5c98:                     10c6 d9a8 4243 b0dd  8}..........BC..
   07:5ca0: d300 0000 0000 0000 f6                   .........
      5ca9:

Downloadable
~~~~~~~~~~~~

Downloadable alarm tones are GBKiss `data files`_ with `creator code`_ ``$76`` and the following content:

.. list-table::
   :widths: auto

   * * Section
     * Size
   * * Metadata_
     * Variable
   * * Name length
     * 1
   * * Name
     * 1-8?
   * * Pattern length
     * 1
   * * Pattern_
     * 1-255?

The alarm tone’s name may differ from the file name; the file name is shown in GBKiss, while the tone name is shown within the Pocket Family GB settings menu.

Need verification:

*  What is the maximum file name that can be shown?
*  What happens if the displayable length is exceeded?
*  What is the maximum pattern length?
*  What happens on invalid patterns?

.. _data files: {filename}/file/index.rst#data
.. _metadata: {filename}metadata.rst

Pattern
~~~~~~~

Patterns consist of:

*  1 unidentified bytes (always observed to be ``$40``)
*  1 tempo command? (observed ``$Fx`` and ``$Cx``)
*  1 transpose command (often ``$A7``)
*  Body commands
*  1 end pattern command (``$B0``)

The following commands are hypothesized:

.. list-table::
   :widths: auto

   * * Cmd
     * Meaning
     * Argument
   * * ``$0x``
     * Sixteenth note?
     * Pitch offset (semitones)
   * * ``$1x``
     * Eighth note
     * Pitch offset (semitones)
   * * ``$2x``
     * Dotted eighth note?
     * Pitch offset (semitones)
   * * ``$3x``
     * Quarter note
     * Pitch offset (semitones)
   * * ``$4x``
     * Dotted quarter note
     * Pitch offset (semitones)
   * * ``$5x``
     * Half note
     * Pitch offset (semitones)
   * * ``$6x``
     * Dotted half note
     * Pitch offset (semitones)
   * * ``$7x``
     * Whole note?
     * Pitch offset (semitones)
   * * ``$8x``
     * Rest
     * 0-8, matching note length?
   * * ``$Ax``
     * Transpose
     * Offset
   * * ``$B0``
     * End pattern
     * Always 0

The pitch of each note is determined by adding the note’s pitch offset to twice the current transposition and interpreting it as a number of semitones. In the common transposition ``$A7``, pitch ``$1`` is C4. Thus, the total pitch range is A2 (0) to F♯6 (45). Alternately, to map to a MIDI pitch number, add 47 (A2).

Some of the built-in tones, such as Alarm 2, demonstrate volume control.

.. include:: ../epilog.rsti
