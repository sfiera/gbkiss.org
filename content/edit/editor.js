const kissMailStub =
    new Uint8Array(
        [0x0F, 0x00, 0x06, 0x00, 0x0A, 0x01, 0x4B, 0x49, 0x53, 0x53, 0x20, 0x4D, 0x41, 0x49, 0x4C])
        .buffer;

const plainCharSet =
    ("\u0000abcdefghijklmno" +
     "pqrstuvwxyz｢|｣¯\\" +
     " !\"#$%&'()*+,-./" +
     "0123456789:;<=>?" +
     "@ABCDEFGHIJKLMNO" +
     "PQRSTUVWXYZ[¥]^_" +
     "をあいうえおかきくけこさしすせそ" +
     "たちつてとなにぬねのはひふへほま" +
     "みむめもやゆよらりるれろわんがぎ" +
     "ぐげござじずぜぞだぢづでどばびぶ" +
     "べぼぱぴぷぺぽぁぃぅぇぉゃゅょっ" +
     "ヲアイウエオカキクケコサシスセソ" +
     "タチツテトナニヌネノハヒフヘホマ" +
     "ミムメモヤユヨラリルレロワンガギ" +
     "グゲゴザジズゼゾダヂヅデドバビブ" +
     "ベボパピプペポァィゥェォャュョッ");

const richAsciiCharSet =
    (" !\"#$%&'()*+,-./" +
     "0123456789:;<=>?" +
     "@ABCDEFGHIJKLMNO" +
     "PQRSTUVWXYZ[¥]^_" +
     "\u0000abcdefghijklmno" +
     "pqrstuvwxyz｢|｣¯\\");

const richKatakanaCharSet =
    ("「」、。ヲァィゥェォャュョッ" +
     "ーアイウエオカキクケコサシスセソ" +
     "タチツテトナニヌネノハヒフヘホマ" +
     "ミムメモヤユヨラリルレロワン");

const richHiraganaCharSet =
    ("「」、。をぁぃぅぇぉゃゅょっ" +
     "ーあいうえおかきくけこさしすせそ" +
     "たちつてとなにぬねのはひふへほま" +
     "みむめもやゆよらりるれろわん");

const diacritics = [
  {
    "カ": "ガ",
    "キ": "ギ",
    "ク": "グ",
    "ケ": "ゲ",
    "コ": "ゴ",
    "サ": "ザ",
    "シ": "ジ",
    "ス": "ズ",
    "セ": "ゼ",
    "ソ": "ゾ",
    "タ": "ダ",
    "チ": "ヂ",
    "ツ": "ヅ",
    "テ": "デ",
    "ト": "ド",
    "ハ": "バ",
    "ヒ": "ビ",
    "フ": "ブ",
    "ヘ": "ベ",
    "ホ": "ボ",
    "か": "が",
    "き": "ぎ",
    "く": "ぐ",
    "け": "げ",
    "こ": "ご",
    "さ": "ざ",
    "し": "じ",
    "す": "ず",
    "せ": "ぜ",
    "そ": "ぞ",
    "た": "だ",
    "ち": "ぢ",
    "つ": "づ",
    "て": "で",
    "と": "ど",
    "は": "ば",
    "ひ": "び",
    "ふ": "ぶ",
    "へ": "べ",
    "ほ": "ぼ",
  },
  {
    "ハ": "パ",
    "ヒ": "ピ",
    "フ": "プ",
    "ヘ": "ペ",
    "ホ": "ポ",
    "は": "ぱ",
    "ひ": "ぴ",
    "ふ": "ぷ",
    "へ": "ぺ",
    "ほ": "ぽ",
  },
];


const builtinIcons = {};
builtinIcons[0x01] = "/file/icon/letter.png";
builtinIcons[0x81] = "/file/icon/mail.png";
builtinIcons[0x40] = "/file/icon/hikou0.png";
builtinIcons[0x41] = "/file/icon/puzzle0.png";
builtinIcons[0x42] = "/file/icon/ken0.png";
builtinIcons[0x43] = "/file/icon/card0.png";
builtinIcons[0x44] = "/file/icon/map.png";
builtinIcons[0x45] = "/file/icon/ie2.png";
const emptyIcon = "/file/menu/empty.png";
const brokenIcon = "/file/icon/simula1.png";

const textImage = new Image();
textImage.src = "/tech/text/font.png"

const fillColors = ["#fff", "#aaa", "#555", "#000"];

const button = (title) => {
  const el = document.createElement("button")
  el.innerText = title;
  return el;
};

const div = (className, text) => {
  const el = document.createElement("div");
  el.className = className;
  return el;
};

decodeImage = (buffer, width, height, bpp) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  data = new DataView(buffer);
  const ctx = canvas.getContext("2d");
  let i = 0;
  for (let col = 0; col < width; col += 8) {
    for (let row = 0; row < height; row++) {
      let byte1 = data.getUint8(i);
      i += bpp;
      let byte2 = data.getUint8(i - 1);
      let mask = 0x80;
      for (let bit = 0; bit < 8; ++bit) {
        let color = ((byte1 & mask) ? 1 : 0) + ((byte2 & mask) ? 2 : 0);
        mask >>= 1;
        ctx.fillStyle = fillColors[color];
        ctx.fillRect(col + bit, row, 1, 1);
      }
    }
  }

  return canvas.toDataURL();
};

textIcon = string => {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 24;

  const ctx = canvas.getContext("2d");
  string.split("").forEach((ch, i) => {
    ch = plainCharSet.indexOf(ch);
    const sx = (ch % 16) * 8;
    const sy = Math.floor(ch / 16) * 8;
    const dx = (i % 4) * 8;
    const dy = Math.floor(i / 4) * 8;
    ctx.drawImage(textImage, sx, sy, 8, 8, dx, dy, 8, 8);
  });

  return canvas.toDataURL();
};

const decodePlainText = buffer =>
    new Uint8Array(buffer).reduce((s, ch) => s + plainCharSet[ch], "");

const decodeRichText = buffer => new Uint8Array(buffer).reduce((state, ch) => {
  const [string, kanaCharSet] = state;
  if (ch === 0x0E) {
    return [string, richKatakanaCharSet];
  } else if (ch === 0x0F) {
    return [string, richHiraganaCharSet];
  } else if (ch <= 0x1F) {
    return [string + String.fromCharCode(ch), kanaCharSet];
  } else if (ch <= 0x7F) {
    return [string + richAsciiCharSet[ch - 0x20], kanaCharSet];
  } else if (ch < 0xA1) {
  } else if (ch <= 0xDD) {
    return [string + kanaCharSet[ch - 0xA2], kanaCharSet];
  } else if (ch <= 0xDF) {
    ch = diacritics[ch - 0xDE][string[string.length - 1]];
    if (ch) {
      return [string.slice(0, string.length - 1) + ch, kanaCharSet];
    }
    return [string, kanaCharSet];
  }
  return [string, kanaCharSet]
}, ["", richKatakanaCharSet])[0];

const dataUrl = buffer => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(new Blob([buffer]));
  });
};

const downloadUrl = (filename, url) => {
  const el = document.createElement("a");
  el.setAttribute("download", filename);
  el.setAttribute("href", url);
  el.click();
};

const selectFile = accept => {
  return new Promise(resolve => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.click();
    input.addEventListener("change", e => {resolve(input.files[0])});
    input.addEventListener("cancel", e => {resolve(null)});
  });
};

const runModal = async (text, bullets, buttons) => {
  const dlog = document.createElement("dialog");
  const p = document.createElement("p");
  p.innerText = text;
  dlog.appendChild(p);
  if (bullets) {
    const ul = document.createElement("ul");
    bullets.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ul.appendChild(li);
    });
    dlog.appendChild(ul);
  }

  const form = document.createElement("form");
  form.method = "dialog";
  buttons.forEach(b => {
    const button = document.createElement("button");
    button.innerText = b;
    button.value = b;
    form.appendChild(button);
  });
  form.firstChild.autofocus = true;
  dlog.appendChild(form);

  document.body.appendChild(dlog);
  dlog.showModal();
  const promise = new Promise(resolve => {
    dlog.addEventListener("close", e => {
      document.body.removeChild(dlog);
      resolve(dlog.returnValue);
    });
  });
  return promise;
};

class KissFile {
  constructor(arrayBuffer) {
    this.data = new DataView(arrayBuffer);
    const size = this.data.getUint16(0, true);
    if (size != arrayBuffer.byteLength) {
      throw new Error("invalid gbf length: " + size + " != " + arrayBuffer.byteLength);
    }
  }

  get size() { return this.data.byteLength; }
  get flags() { return this.data.getUint8(2); }
  get cartId() { return this.data.getUint8(3); }
  get ownerId() { return this.data.getUint8(5); }

  get title() {
    const headerSize = this.data.getUint8(4);
    let titleEnd = 5 + headerSize;
    if (this.flags & 0x10) {
      if (this.flags & 0x08) {
        titleEnd -= 0xC0;
      } else {
        titleEnd -= 0x60;
      }
    }
    return decodeRichText(this.data.buffer.slice(6, titleEnd));
  }

  get iconUrl() {
    if (this.flags & 0x10) {
      const bpp = (this.flags & 0x08) ? 2 : 1;
      const iconEnd = 5 + this.data.getUint8(4);
      const iconStart = iconEnd - (0x60 * bpp);
      return decodeImage(this.data.buffer.slice(iconStart, iconEnd), 32, 24, bpp);
    } else if (this.ownerId === 0) {
      return textIcon(this.title);
    } else if (builtinIcons[this.ownerId]) {
      return builtinIcons[this.ownerId];
    } else {
      return null;
    }
  }

  get dataUrl() { return dataUrl(this.data.buffer); }
};

class SaveFile {
  constructor(arrayBuffer) {
    if (arrayBuffer.length < 0x8000) {
      throw new Error("save file too short: " + arrayBuffer.length);
    }
    this.data = new DataView(arrayBuffer);

    let cursor = 2;
    let prev = 0x4000;
    let index = null;
    let profile = null;
    while (true) {
      const type = this.data.getUint8(cursor);
      const typeInv = this.data.getUint8(cursor + 1);
      const next = this.data.getUint16(cursor + 4, true);
      if ((type ^ typeInv) != 0xFF) {
        throw new Error("invalid type: " + type);
      } else if (this.data.getUint16(cursor + 2, true) != prev) {
        throw new Error("invalid prev pointer: " + prev);
      } else if ((next < 0xA002) || (next > 0xC000)) {
        throw new Error("invalid next pointer: " + next);
      }
      if (type === 0x53) {  // 'S'
        if (index === null) {
          index = cursor + 6;
        } else if (profile === null) {
          profile = cursor + 6;
          if (next != 0xC000) {
            throw new Error("profile is not last");
          }
          break;
        }
      } else if (index !== null) {
        throw new Error("index should be immediately followed by profile");
      }
      prev = 0xA000 | (cursor & 0x1FFF);
      if (next == 0xC000) {
        cursor = (cursor & 0xE000) + 0x2002;
      } else {
        cursor = (cursor & 0xE000) + (next & 0x1FFF);
      }
    }
    if (profile != (index + 486)) {
      throw new Error("index is wrong size: " + (profile - index));
    } else if ((profile & 0x1FFF) > 0x1F86) {
      throw new Error("profile is truncated: " + (profile & 0x1FFF));
    }

    this.indexPos = index;
    this.profilePos = profile;
  }

  get files() {
    const list = [];
    for (let i = 0; i < 120; ++i) {
      list.push(this.fileAt(i));
    }
    return list;
  }

  fileAt(index) {
    const addr = this.data.getUint16(this.indexPos + (index * 4), true);
    if (addr === 0) {
      return null;
    }
    const owner = this.data.getUint8(this.indexPos + (index * 4) + 3);
    if (owner === 1) {
      return new KissFile(kissMailStub);
    }
    const size = this.data.getUint16(addr, true);
    return new KissFile(this.data.buffer.slice(addr, addr + size));
  }
};

class Editor {
  constructor(parent) {
    this.saveFile = null;
    this.panel = document.createElement("div");

    this.buttons = {
      load: {
        init: el => {
          this.buttons.load.element = el;
          el.innerText = "Load";
          el.addEventListener("click", async e => {
            const file = await selectFile(".sav");
            if (file) {
              await this.openFile(file, this.panel);
            }
          });
        },
      },
      save: {
        init: el => {
          this.buttons.save.element = el;
          el.innerText = "Save";
          el.disabled = true;
        },
      },
      close: {
        init: el => {
          this.buttons.close.element = el;
          el.innerText = "Close";
          el.disabled = true;
          el.addEventListener("click", e => {
            this.close();
          });
        },
      },
      install: {
        init: el => {
          this.buttons.install.element = el;
          el.innerText = "Install";
          el.disabled = true;
        },
      },
    };

    const buttons = document.createElement("div");
    Object.values(this.buttons).forEach(button => {
      button.init(document.createElement("button"));
      buttons.appendChild(button.element);
    });

    parent.replaceChildren(buttons, this.panel);
  }

  figureFor(file) {
    const figure = div("figure");
    figure.draggable = true;

    const img = document.createElement("img");
    img.draggable = false;
    img.style = "width: 64px; height: 48px";
    if (file) {
      img.src = file.iconUrl || brokenIcon;
      const title = document.createElement("p");
      title.innerText = file.title;
      const actions = document.createElement("p");

      const download = document.createElement("button");
      const downloadIcon = document.createElement("img");
      downloadIcon.src = "/edit/download.svg";
      downloadIcon.style = "width: 0.75em; height: 0.75em";
      downloadIcon.draggable = false;
      download.appendChild(downloadIcon);
      download.addEventListener("click", async e => {
        e.preventDefault();
        downloadUrl(file.title + ".gbf", await file.dataUrl);
      });

      const remove = document.createElement("button");
      const removeIcon = document.createElement("img");
      removeIcon.src = "/edit/remove.svg";
      removeIcon.style = "width: 0.75em; height: 0.75em";
      removeIcon.draggable = false;
      remove.appendChild(removeIcon);
      remove.disabled = true;

      actions.replaceChildren(download, remove);
      figure.replaceChildren(img, title, actions);
    } else {
      img.src = emptyIcon;
      figure.replaceChildren(img);
    }
    return figure;
  }

  async openFile(file) {
    const buffer = await file.arrayBuffer();
    try {
      this.saveFile = new SaveFile(buffer);
    } catch {
      runModal(
          "GBKiss save data not found",
          ["Is this file a Game Boy save file?",
           "Is the associated game GBKiss-enabled?",
           "Has the owner info been initialized?"],
          ["OK"]);
      return;
    }
    const contents = document.createElement("div");
    contents.className = "gallery-small";
    let emptyCount = 0;
    this.saveFile.files.forEach((file, i) => {
      if (!file) {
        ++emptyCount;
        return;
      }
      for (let j = 0; j < emptyCount; ++j) {
        contents.appendChild(this.figureFor(null));
      }
      emptyCount = 0;
      contents.appendChild(this.figureFor(file));
    });
    this.buttons.close.element.disabled = false;
    this.buttons.load.element.disabled = true;
    this.panel.replaceChildren(contents);
  }

  async close() {
    const dropbox = document.createElement("div");
    dropbox.className = "bordered";
    dropbox.innerText = "Load file or drop here to edit";

    dropbox.addEventListener("dragenter", e => {dropbox.classList.add("dropTarget")});
    dropbox.addEventListener("dragleave", e => {dropbox.classList.remove("dropTarget")});
    dropbox.addEventListener("dragover", e => {e.preventDefault()});

    dropbox.addEventListener("drop", async e => {
      e.preventDefault();
      dropbox.classList.remove("dropTarget");
      if (e.dataTransfer.items) {
        await this.openFile(e.dataTransfer.items[0].getAsFile());
      } else if (e.dataTransfer.files) {
        await this.openFile(e.dataTransfer.files[0]);
      } else {
        await showModal("No file was dropped");
      }
    });
    this.buttons.close.element.disabled = true;
    this.buttons.load.element.disabled = false;
    this.panel.replaceChildren(dropbox);
  }
};

document.addEventListener("DOMContentLoaded", e => {
  new Editor(document.getElementById("editor")).close();
});
