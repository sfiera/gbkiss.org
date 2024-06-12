Alarms
======

:lang: en
:slug: tech/alarm
:tags: tech

Pocket Family GB provides an alarm feature through the `HuC-3 mapper`_, with a selection of different alarm tones. It also supports installing additional alarm tones through GBKiss.

The built-in alarm tones are:

* めざましおん: Alarm Tone (2 variants)
* ピンポンおん: Doorbell (4 variants)
* ほうかごチャイム: Afterschool chime
* きゅうきゅうしゃ: Ambulance
* きよし　このよる: Silent Night

.. _HuC-3 mapper: {filename}mapper.rst#huc-3

Format
------

Downloadable alarm tones are GBKiss `data files`_ with the following sections:

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

*  2 unidentified bytes (pitch? tempo?)
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

The pitch of each note is determined by adding the note’s pitch offset to the current transposition and interpreting it as a number of semitones. In the common transposition ``$A7``, pitch ``$1`` is C4. Thus, assuming both the transposition and offset are allowed to take the full range ``$0...F``, the total pitch range is E3 (0) to A♯5 (30).

Some of the built-in tones, such as Alarm 2, demonstrate volume control.

.. include:: ../epilog.rsti
