Blockly.Blocks['matter_new_rectangle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("新しい四角形");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X座標");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y座標");
    this.appendValueInput("width")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("横幅");
    this.appendValueInput("height")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("高さ");
    this.appendValueInput("is_static")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("固定するか (trueで固定)");
    this.appendValueInput("color")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("色");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['matter_new_rectangle'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var value_is_static = Blockly.JavaScript.valueToCode(block, 'is_static', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'physicaly.matter.makeBody("rectangle",' + value_x + "," + value_y + "," + value_width + "," + value_height + "," + value_is_static + "," + value_color + ');\n';
  return code;
};

Blockly.Blocks['matter_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("エンジンを初期化する");
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['matter_init'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'physicaly.matter.init();\n';
  return code;
};

Blockly.Blocks['matter_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("図形を表示する");
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['matter_show'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'physicaly.matter.pushBodies();\n';
  return code;
};