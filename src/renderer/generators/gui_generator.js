// GUI Screen Java Code Generator
class GuiCodeGenerator {
  constructor(modId) {
    this.modId = modId;
  }

  generateScreenClass(pkg, screen) {
    const className = this._toClassName(screen.screenId) + 'Screen';
    let code = `package ${pkg};\n\n`;
    code += `import net.minecraft.client.gui.DrawContext;\n`;
    code += `import net.minecraft.client.gui.screen.Screen;\n`;
    code += `import net.minecraft.client.gui.widget.ButtonWidget;\n`;
    code += `import net.minecraft.client.gui.widget.TextFieldWidget;\n`;
    code += `import net.minecraft.client.gui.widget.SliderWidget;\n`;
    code += `import net.minecraft.item.ItemStack;\n`;
    code += `import net.minecraft.registry.Registries;\n`;
    code += `import net.minecraft.sound.SoundEvents;\n`;
    code += `import net.minecraft.text.Text;\n`;
    code += `import net.minecraft.util.Identifier;\n`;
    code += `import java.util.HashMap;\n`;
    code += `import java.util.Map;\n\n`;
    code += `public class ${className} extends Screen {\n`;
    code += `    private final int guiWidth = ${screen.width};\n`;
    code += `    private final int guiHeight = ${screen.height};\n`;
    code += `    private int guiLeft, guiTop;\n`;
    code += `    private final Map<String, Object> vars = new HashMap<>();\n\n`;

    // Text field declarations
    const textFields = screen.elements.filter(e => e.type === 'gui_text_field');
    for (let i = 0; i < textFields.length; i++) {
      code += `    private TextFieldWidget textField${i};\n`;
    }
    code += `\n`;

    code += `    public ${className}() {\n`;
    code += `        super(Text.literal("${this._escape(screen.title)}"));\n`;
    code += `    }\n\n`;

    // init
    code += `    @Override\n`;
    code += `    protected void init() {\n`;
    code += `        super.init();\n`;
    code += `        guiLeft = (this.width - guiWidth) / 2;\n`;
    code += `        guiTop = (this.height - guiHeight) / 2;\n\n`;

    let btnIdx = 0, tfIdx = 0, sliderIdx = 0;
    for (const el of screen.elements) {
      switch (el.type) {
        case 'gui_button':
          code += `        // ボタン: ${el.text}\n`;
          code += `        this.addDrawableChild(ButtonWidget.builder(Text.literal("${this._escape(el.text)}"), button -> {\n`;
          code += this._generateGuiActions(el.actions, '            ');
          code += `        }).dimensions(guiLeft + ${el.x}, guiTop + ${el.y}, ${el.w}, ${el.h}).build());\n\n`;
          btnIdx++;
          break;
        case 'gui_toggle':
          code += `        // トグル: ${el.text}\n`;
          code += `        vars.put("${el.varName}", false);\n`;
          code += `        this.addDrawableChild(ButtonWidget.builder(Text.literal("${this._escape(el.text)}: OFF"), button -> {\n`;
          code += `            boolean val = !(boolean) vars.getOrDefault("${el.varName}", false);\n`;
          code += `            vars.put("${el.varName}", val);\n`;
          code += `            button.setMessage(Text.literal("${this._escape(el.text)}: " + (val ? "ON" : "OFF")));\n`;
          code += `        }).dimensions(guiLeft + ${el.x}, guiTop + ${el.y}, ${el.w}, 20).build());\n\n`;
          break;
        case 'gui_text_field':
          code += `        // テキスト入力欄\n`;
          code += `        textField${tfIdx} = new TextFieldWidget(this.textRenderer, guiLeft + ${el.x}, guiTop + ${el.y}, ${el.w}, 20, Text.literal(""));\n`;
          code += `        textField${tfIdx}.setPlaceholder(Text.literal("${this._escape(el.placeholder)}"));\n`;
          code += `        textField${tfIdx}.setChangedListener(text -> vars.put("${el.varName}", text));\n`;
          code += `        this.addDrawableChild(textField${tfIdx});\n\n`;
          tfIdx++;
          break;
        case 'gui_slider':
          code += `        // スライダー: ${el.label}\n`;
          code += `        vars.put("${el.varName}", ${el.defaultVal});\n`;
          code += `        this.addDrawableChild(new SliderWidget(guiLeft + ${el.x}, guiTop + ${el.y}, ${el.w}, 20, Text.literal("${this._escape(el.label)}: ${el.defaultVal}"), ${(el.defaultVal - el.min) / (el.max - el.min)}) {\n`;
          code += `            @Override protected void updateMessage() { setMessage(Text.literal("${this._escape(el.label)}: " + (int)(${el.min} + value * ${el.max - el.min}))); }\n`;
          code += `            @Override protected void applyValue() { vars.put("${el.varName}", (int)(${el.min} + value * ${el.max - el.min})); }\n`;
          code += `        });\n\n`;
          sliderIdx++;
          break;
      }
    }

    code += `    }\n\n`;

    // render
    code += `    @Override\n`;
    code += `    public void render(DrawContext context, int mouseX, int mouseY, float delta) {\n`;
    code += `        this.renderBackground(context, mouseX, mouseY, delta);\n\n`;

    for (const el of screen.elements) {
      switch (el.type) {
        case 'gui_rect':
          if (el.outline) {
            code += `        context.drawBorder(guiLeft + ${el.x}, guiTop + ${el.y}, ${el.w}, ${el.h}, ${el.color});\n`;
          }
          code += `        context.fill(guiLeft + ${el.x}${el.outline ? ' + 1' : ''}, guiTop + ${el.y}${el.outline ? ' + 1' : ''}, guiLeft + ${el.x} + ${el.w}${el.outline ? ' - 1' : ''}, guiTop + ${el.y} + ${el.h}${el.outline ? ' - 1' : ''}, (int) Long.parseLong("${el.color}".replace("0x",""), 16));\n`;
          break;
        case 'gui_label':
          if (parseFloat(el.scale) !== 1) {
            code += `        context.getMatrices().push();\n`;
            code += `        context.getMatrices().scale(${el.scale}f, ${el.scale}f, 1f);\n`;
            code += `        context.drawText(this.textRenderer, "${this._escape(el.text)}", (int)((guiLeft + ${el.x}) / ${el.scale}f), (int)((guiTop + ${el.y}) / ${el.scale}f), ${el.color}, ${el.shadow});\n`;
            code += `        context.getMatrices().pop();\n`;
          } else {
            code += `        context.drawText(this.textRenderer, "${this._escape(el.text)}", guiLeft + ${el.x}, guiTop + ${el.y}, ${el.color}, ${el.shadow});\n`;
          }
          break;
        case 'gui_label_centered':
          code += `        context.drawCenteredTextWithShadow(this.textRenderer, "${this._escape(el.text)}", this.width / 2, guiTop + ${el.y}, ${el.color});\n`;
          break;
        case 'gui_separator':
          code += `        context.fill(guiLeft + 5, guiTop + ${el.y}, guiLeft + guiWidth - 5, guiTop + ${el.y} + 1, ${el.color});\n`;
          break;
        case 'gui_item_display':
          code += `        context.drawItem(new ItemStack(Registries.ITEM.get(Identifier.of("${el.item}"))), guiLeft + ${el.x}, guiTop + ${el.y});\n`;
          break;
        case 'gui_progress_bar':
          code += `        {\n`;
          code += `            int progress = (int) vars.getOrDefault("${el.varName}", 0);\n`;
          code += `            context.fill(guiLeft + ${el.x}, guiTop + ${el.y}, guiLeft + ${el.x} + ${el.w}, guiTop + ${el.y} + ${el.h}, 0xFF333333);\n`;
          code += `            context.fill(guiLeft + ${el.x}, guiTop + ${el.y}, guiLeft + ${el.x} + ${el.w} * progress / 100, guiTop + ${el.y} + ${el.h}, ${el.color});\n`;
          code += `        }\n`;
          break;
        case 'gui_image':
          code += `        context.drawTexture(Identifier.of("${this.modId}", "textures/gui/${el.texture}.png"), guiLeft + ${el.x}, guiTop + ${el.y}, 0, 0, ${el.w}, ${el.h}, ${el.w}, ${el.h});\n`;
          break;
      }
    }

    code += `\n        super.render(context, mouseX, mouseY, delta);\n`;
    code += `    }\n\n`;

    code += `    @Override\n`;
    code += `    public boolean shouldPause() {\n`;
    code += `        return false;\n`;
    code += `    }\n`;
    code += `}\n`;
    return { className, code };
  }

  _generateGuiActions(actions, indent) {
    let code = '';
    for (const a of actions) {
      switch (a.type) {
        case 'gui_action_close':
          code += `${indent}this.close();\n`; break;
        case 'gui_action_send_command':
          code += `${indent}if (this.client != null && this.client.player != null) this.client.player.networkHandler.sendCommand("${this._escape(a.command)}");\n`; break;
        case 'gui_action_send_chat':
          code += `${indent}if (this.client != null && this.client.player != null) this.client.player.networkHandler.sendChatMessage("${this._escape(a.message)}");\n`; break;
        case 'gui_action_play_sound':
          code += `${indent}if (this.client != null && this.client.player != null) this.client.player.playSound(SoundEvents.${a.sound}, 1.0f, 1.0f);\n`; break;
        case 'gui_action_set_var':
          code += `${indent}vars.put("${a.varName}", "${this._escape(a.value)}");\n`; break;
        case 'gui_action_open_screen':
          code += `${indent}if (this.client != null) this.client.setScreen(new ${this._toClassName(a.screenId)}Screen());\n`; break;
      }
    }
    return code;
  }

  _toClassName(id) {
    return id.split(/[_\s-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  }

  _escape(str) {
    return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }
}
