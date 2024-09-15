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

const makeElement = (tagName, properties = {}) => {
  const el = document.createElement(tagName);
  Object.entries(properties).forEach(([key, value]) => {
    if (key === "children") {
      el.replaceChildren(...value);
    } else if (key === "eventListeners") {
      Object.entries(value).forEach(([type, listener]) => {
        el.addEventListener(type, listener);
      });
    } else {
      el[key] = value;
    }
  });
  return el;
};

makeImage = (width, height, fn) => {
  const canvas = makeElement("canvas", {
    width: width,
    height: height,
  });
  fn(canvas.getContext("2d"));
  return canvas.toDataURL();
};

decodeImage = (buffer, width, height, bpp) => makeImage(width, height, ctx => {
  data = new DataView(buffer);
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
});

textIcon = string => makeImage(32, 24, ctx => {
  string.split("").forEach((ch, i) => {
    ch = plainCharSet.indexOf(ch);
    const sx = (ch % 16) * 8;
    const sy = Math.floor(ch / 16) * 8;
    const dx = (i % 4) * 8;
    const dy = Math.floor(i / 4) * 8;
    ctx.drawImage(textImage, sx, sy, 8, 8, dx, dy, 8, 8);
  });
});

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
    const head = string.slice(0, -1), tail = string.slice(-1);
    return [head + (diacritics[ch - 0xDE][tail] || tail), kanaCharSet];
  }
  return [string, kanaCharSet]
}, ["", richKatakanaCharSet])[0];

const hexByte = byte => "$" + ("0" + byte.toString(16)).slice(-2);

const dataUrl = buffer => new Promise(resolve => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.readAsDataURL(new Blob([buffer]));
});

const downloadUrl = (filename, url) => {
  makeElement("a", {download: filename, href: url}).click();
};

const selectFile = accept => new Promise(resolve => {
  makeElement("input", {
    type: "file",
    accept: accept,
    eventListeners: {
      change: e => {resolve(e.target.files[0])},
      cancel: e => {resolve(null)},
    },
  }).click();
});

const typeIcon = file => {
  let src = "/file/menu/triangle.svg";
  if (file.isExecutable) {
    if (file.ownerId === 1) {
      src = "/file/menu/bullseye.svg";
    } else if (file.isZeroFile) {
      src = "/file/menu/diamond.svg";
    } else {
      src = "/file/menu/circle.svg";
    }
  }
  return makeElement("img", {
    src: src,
    style: "width: 0.75em; height: 0.75em",
  });
};

const runModal = (children, buttons) => new Promise(resolve => {
  const dlog = makeElement("dialog", {
    children: children,
  });

  const form = makeElement("form", {
    method: "dialog",
    children: buttons.map(b => makeElement("button", {innerText: b, value: b})),
  });
  form.firstChild.autofocus = true;
  dlog.appendChild(form);

  dlog.addEventListener("close", e => {
    document.body.removeChild(dlog);
    resolve(dlog.returnValue);
  });
  document.body.appendChild(dlog);
  dlog.showModal();
});

class KissFile {
  constructor(arrayBuffer) {
    this.data = new DataView(arrayBuffer);
    const size = this.data.getUint16(0, true);
    if (size != arrayBuffer.byteLength) {
      throw new Error(`invalid gbf length: ${size} != ${arrayBuffer.byteLength}`);
    }
  }

  get size() { return this.data.byteLength; }
  get cartId() { return this.data.getUint8(3); }
  get ownerId() { return this.data.getUint8(5); }

  get flags() { return this.data.getUint8(2); }
  get hasIcon() { return this.flags & 0x10; }
  get hasIcon2bpp() { return this.flags & 0x08; }
  get isExecutable() { return this.flags & 0x04; }
  get isZeroFile() { return this.flags & 0x02; }
  get hasHistory() { return this.flags & 0x01; }

  get author() {
    const history = 5 + this.data.getUint8(4);
    return decodePlainText(this.data.buffer.slice(history + 2, history + 12)).trimEnd();
  }

  get title() {
    const headerSize = this.data.getUint8(4);
    let titleEnd = 5 + headerSize;
    if (this.hasIcon) {
      if (this.hasIcon2bpp) {
        titleEnd -= 0xC0;
      } else {
        titleEnd -= 0x60;
      }
    }
    return decodeRichText(this.data.buffer.slice(6, titleEnd));
  }

  get iconUrl() {
    if (this.hasIcon) {
      const bpp = (this.hasIcon2bpp) ? 2 : 1;
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
      throw new Error(`save file too short: ${arrayBuffer.length}`);
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
        throw new Error(`invalid type: ${type}`);
      } else if (this.data.getUint16(cursor + 2, true) != prev) {
        throw new Error(`invalid prev pointer: ${prev}`);
      } else if ((next < 0xA002) || (next > 0xC000)) {
        throw new Error(`invalid next pointer: ${next}`);
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
      throw new Error(`index is wrong size: ${profile - index}`);
    } else if ((profile & 0x1FFF) > 0x1F86) {
      throw new Error(`profile is truncated: ${profile & 0x1FFF}`);
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
    this.panel = makeElement("div");

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

    const buttons = makeElement("div");
    Object.values(this.buttons).forEach(button => {
      button.init(makeElement("button"));
      buttons.appendChild(button.element);
    });

    parent.replaceChildren(buttons, this.panel);
  }

  figureFor(index, file) {
    const figure = makeElement("div", {
      className: "figure",
      draggable: true,
    });

    const img = makeElement("img", {
      draggable: false,
      style: "width: 64px; height: 48px",
    });
    figure.appendChild(img);
    if (!file) {
      img.src = emptyIcon;
      return figure;
    }

    img.src = file.iconUrl || brokenIcon;

    const actions = makeElement("form");

    const info = makeElement("button", {
      children: [makeElement("img", {
        src: "/edit/info.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        click: async e => {
          e.preventDefault();
          runModal(
              [
                makeElement("h3", {innerText: file.title}),
                makeElement("ul", {
                  children: [
                    makeElement("li", {
                      innerText: `Size: ${Math.floor((file.size + 255) / 256)} blocks (${
                          file.size} bytes)`,
                    }),
                    makeElement("li", {children: ["Type: ", typeIcon(file)]}),
                    file.hasHistory ? makeElement("li", {innerText: `Author: ${file.author}`}) :
                                      "",
                    makeElement("li", {
                      children: [
                        "Owner Code: ",
                        makeElement("tt", {innerText: hexByte(file.ownerId)}),
                      ],
                    }),
                  ],
                }),
              ],
              ["Close"]);
        },
      },
    });
    actions.appendChild(info);

    const download = makeElement("button", {
      disabled: (file.ownerId === 1),
      children: [makeElement("img", {
        src: "/edit/download.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        click: async e => {
          e.preventDefault();
          downloadUrl(file.title + ".gbf", await file.dataUrl);
        },
      },
    });
    actions.appendChild(download);

    const remove = makeElement("button", {
      disabled: true,
      children: [makeElement("img", {
        src: "/edit/remove.svg",
        style: "width: 0.75em; height: 0.75em",
        draggable: false,
      })],
      eventListeners: {
        "click": async e => {
          e.preventDefault();
        },
      },
    });
    actions.appendChild(remove);

    figure.appendChild(actions);

    const title = makeElement("p", {innerText: file.title});
    figure.appendChild(title);

    return figure;
  }

  async openFile(file) {
    const buffer = await file.arrayBuffer();
    try {
      this.saveFile = new SaveFile(buffer);
    } catch {
      runModal(
          [
            makeElement("p", {innerText: "GBKiss save data not found"}),
            makeElement("ul", {
              children: [
                makeElement("li", {innerText: "Is this file a Game Boy save file?"}),
                makeElement("li", {innerText: "Is the associated game GBKiss-enabled?"}),
                makeElement("li", {innerText: "Has the owner info been initialized?"}),
              ],
            }),
          ],
          ["OK"]);
      return;
    }
    const contents = makeElement("div", {className: "gallery-small"});
    let emptyCount = 0;
    this.saveFile.files.forEach((file, i) => {
      if (!file) {
        ++emptyCount;
        return;
      }
      for (let j = 0; j < emptyCount; ++j) {
        contents.appendChild(this.figureFor(i - emptyCount + j, null));
      }
      emptyCount = 0;
      contents.appendChild(this.figureFor(i, file));
    });
    this.buttons.close.element.disabled = false;
    this.buttons.load.element.disabled = true;
    this.panel.replaceChildren(contents);
  }

  async close() {
    const dropbox = makeElement("div", {
      className: "bordered",
      innerText: "Load file or drop here to edit",
    });

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
