Relative Addressing
===================

:lang: en
:slug: tech/relative
:tags: tech

In order to allow installation at any location within CRAM_, most GBKiss software makes use of ``RST $10``. In its basic form, it takes the address and content of the next 2-byte word, adds them together, and pushes the result onto the stack:

.. _CRAM: {filename}storage.rst

.. code-block:: ca65

   ; pushx addr (3 bytes)
   MACRO pushx
       rst $10
       dw \1 - @
   ENDM

In combination with the ``pop`` and ``ret`` instructions, this can be used to implement loads, jumps, and calls:

.. code-block:: ca65

   ; ldx r16, addr (4 bytes)
   MACRO ldx
       pushx \2
       pop \1
   ENDM

   ; jx addr (4 bytes)
   MACRO jx
       pushx \1
       ret
   ENDM

   ; callx addr (7 bytes)
   MACRO callx
       pushx @ + 6
       jx \1
   ENDM

Software marked with |diamond| is always installed to ``$A008``, and does not need to use relative addressing.

.. include:: ../epilog.rsti
