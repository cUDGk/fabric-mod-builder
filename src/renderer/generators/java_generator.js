// Java Code Generator for Fabric MOD
class FabricJavaGenerator {
  constructor() {
    this.modId = 'my_mod';
    this.modName = 'My Mod';
    this.version = '1.0.0';
    this.modSide = 'BOTH';
    this.items = [];
    this.blocks = [];
    this.events = [];
    this.recipes = [];
    this.commands = [];
    this.enchantments = [];
    this.containers = [];
    this.statusEffects = [];
    this.throwables = [];
    this.customSounds = [];
    this.paintings = [];
    this.bannerPatterns = [];
    this.fluids = [];
    this.dimensions = [];
    this.variables = new Set();
  }

  generate(workspace) {
    this.items = [];
    this.blocks = [];
    this.events = [];
    this.recipes = [];
    this.commands = [];
    this.enchantments = [];
    this.containers = [];
    this.statusEffects = [];
    this.throwables = [];
    this.customSounds = [];
    this.paintings = [];
    this.bannerPatterns = [];
    this.fluids = [];
    this.dimensions = [];
    this.variables = new Set();
    this.armorSets = [];
    this.tooltips = [];
    this.creativeTabs = [];
    this.oreGens = [];
    this.advancements = [];
    this.guiScreens = [];
    this.modId = 'my_mod';
    this.modName = 'My Mod';
    this.version = '1.0.0';
    this.modSide = 'BOTH';

    // Find mod_init block
    const topBlocks = workspace.getTopBlocks(true);
    const modInit = topBlocks.find(b => b.type === 'mod_init');

    if (!modInit) {
      return {
        main: '// MOD初期化ブロックを配置してください',
        items: '',
        blocks: '',
        events: '',
        commands: '',
        recipes: {}
      };
    }

    this.modId = modInit.getFieldValue('MOD_ID') || 'my_mod';
    this.modName = modInit.getFieldValue('MOD_NAME') || 'My Mod';
    this.version = modInit.getFieldValue('VERSION') || '1.0.0';
    this.mcVersion = modInit.getFieldValue('MC_VERSION') || '1.21.4';
    this.modSide = modInit.getFieldValue('MOD_SIDE') || 'BOTH';
    this.noCheat = modInit.getFieldValue('NO_CHEAT') === 'TRUE';

    // Process all children
    let block = modInit.getInputTargetBlock('CONTENT');
    while (block) {
      this._processBlock(block);
      block = block.getNextBlock();
    }

    const pkg = `com.modbuilder.${this.modId}`;
    const className = this._toClassName(this.modName);

    return {
      modId: this.modId,
      modName: this.modName,
      version: this.version,
      mcVersion: this.mcVersion,
      modSide: this.modSide,
      noCheat: this.noCheat,
      main: this._generateMainClass(pkg, className),
      items: this._generateItemsClass(pkg),
      blocks: this._generateBlocksClass(pkg),
      events: this._generateEventsClass(pkg, className),
      commands: this._generateCommandsClass(pkg),
      modVars: this._generateModVarsClass(pkg),
      worldGen: this._generateWorldGenClass(pkg),
      containers: this._generateContainersClass(pkg, className),
      sync: this._generateSyncClass(pkg, className),
      recipes: this._generateRecipes(),
      fabricModJson: this._generateFabricModJson(pkg, className),
      guiScreens: this.guiScreens,
      resources: this._generateResources()
    };
  }

  _processBlock(block) {
    switch (block.type) {
      case 'register_item':
        this.items.push(this._extractItem(block));
        break;
      case 'item_tool':
        this.items.push(this._extractToolItem(block));
        break;
      case 'register_block':
        this.blocks.push(this._extractBlock(block));
        break;
      case 'register_ore_block':
        this.blocks.push(this._extractOreBlock(block));
        break;
      case 'register_falling_block':
      case 'register_tnt_block':
      case 'register_light_block':
      case 'register_redstone_block':
        this.blocks.push(this._extractBlock(block));
        break;
      case 'recipe_shaped':
        this.recipes.push(this._extractShapedRecipe(block));
        break;
      case 'recipe_shapeless':
        this.recipes.push(this._extractShapelessRecipe(block));
        break;
      case 'recipe_smelting':
        this.recipes.push(this._extractSmeltingRecipe(block));
        break;
      case 'recipe_smithing':
        this.recipes.push({ type: 'smithing', base: block.getFieldValue('BASE'),
          addition: block.getFieldValue('ADDITION'), result: block.getFieldValue('RESULT') });
        break;
      case 'recipe_stonecutting':
        this.recipes.push({ type: 'stonecutting', input: block.getFieldValue('INPUT'),
          output: block.getFieldValue('OUTPUT'), count: block.getFieldValue('COUNT') });
        break;
      case 'on_item_use':
      case 'on_block_break':
      case 'on_block_place':
      case 'on_block_interact':
      case 'on_player_join':
      case 'on_player_death':
      case 'on_player_respawn':
      case 'on_player_damage':
      case 'on_player_attack':
      case 'on_entity_death':
      case 'on_server_tick':
        this.events.push(this._extractEvent(block));
        break;
      case 'register_stair_block':
        this.blocks.push({ type: 'stair', id: block.getFieldValue('BLOCK_ID'), name: block.getFieldValue('BLOCK_NAME'), baseBlock: block.getFieldValue('BASE_BLOCK'), hasItem: true });
        break;
      case 'register_slab_block':
        this.blocks.push({ type: 'slab', id: block.getFieldValue('BLOCK_ID'), name: block.getFieldValue('BLOCK_NAME'), hasItem: true });
        break;
      case 'register_fence_block':
        this.blocks.push({ type: 'fence', id: block.getFieldValue('BLOCK_ID'), name: block.getFieldValue('BLOCK_NAME'), hasItem: true });
        break;
      case 'register_door_block':
        this.blocks.push({ type: 'door', id: block.getFieldValue('BLOCK_ID'), name: block.getFieldValue('BLOCK_NAME'), hasItem: true });
        break;
      case 'register_crop':
        this.blocks.push({ type: 'crop', id: block.getFieldValue('CROP_ID'), name: block.getFieldValue('SEED_NAME'), hasItem: false,
          seedId: block.getFieldValue('SEED_ID'), harvestId: block.getFieldValue('HARVEST_ID'),
          minDrop: block.getFieldValue('MIN_DROP'), maxDrop: block.getFieldValue('MAX_DROP'),
          seedName: block.getFieldValue('SEED_NAME'), harvestName: block.getFieldValue('HARVEST_NAME') });
        // Also register seed and harvest as items
        this.items.push({ type: 'item', id: block.getFieldValue('SEED_ID'), name: block.getFieldValue('SEED_NAME'), maxCount: 64, rarity: 'COMMON', isFood: false });
        this.items.push({ type: 'item', id: block.getFieldValue('HARVEST_ID'), name: block.getFieldValue('HARVEST_NAME'), maxCount: 64, rarity: 'COMMON', isFood: false });
        break;
      case 'register_item_animated':
        this.items.push({ type: 'animated', id: block.getFieldValue('ITEM_ID'), name: block.getFieldValue('ITEM_NAME'),
          animation: block.getFieldValue('ANIMATION'), useTime: block.getFieldValue('USE_TIME'), maxCount: 1, rarity: 'UNCOMMON',
          actions: this._extractActions(block.getInputTargetBlock('ACTIONS')) });
        break;
      case 'register_command':
        this.commands.push(this._extractCommand(block));
        break;
      case 'register_command_with_arg':
        this.commands.push(this._extractCommandWithArg(block));
        break;
      case 'register_armor_set':
        this.armorSets.push({
          idPrefix: block.getFieldValue('ID_PREFIX'),
          namePrefix: block.getFieldValue('NAME_PREFIX'),
          baseMaterial: block.getFieldValue('BASE_MATERIAL'),
          durabilityMult: block.getFieldValue('DURABILITY_MULT'),
          enchantability: block.getFieldValue('ENCHANTABILITY'),
          helmetDef: block.getFieldValue('HELMET_DEF'),
          chestDef: block.getFieldValue('CHEST_DEF'),
          legsDef: block.getFieldValue('LEGS_DEF'),
          bootsDef: block.getFieldValue('BOOTS_DEF')
        });
        break;
      case 'item_tooltip':
        this.tooltips.push({
          itemId: block.getFieldValue('ITEM_ID'),
          lines: [block.getFieldValue('LINE1'), block.getFieldValue('LINE2'), block.getFieldValue('LINE3')].filter(l => l),
          color: block.getFieldValue('COLOR')
        });
        break;
      case 'register_creative_tab':
        this.creativeTabs.push({
          tabId: block.getFieldValue('TAB_ID'),
          tabName: block.getFieldValue('TAB_NAME'),
          iconItem: block.getFieldValue('ICON_ITEM')
        });
        break;
      case 'register_ore_gen':
        this.oreGens.push({
          blockId: block.getFieldValue('BLOCK_ID'),
          minY: block.getFieldValue('MIN_Y'),
          maxY: block.getFieldValue('MAX_Y'),
          veinsPerChunk: block.getFieldValue('VEINS_PER_CHUNK'),
          veinSize: block.getFieldValue('VEIN_SIZE'),
          dimension: block.getFieldValue('DIMENSION')
        });
        break;
      case 'register_gui_screen':
        this.guiScreens.push(this._extractGuiScreen(block));
        break;
      case 'register_advancement':
        this.advancements.push({
          advId: block.getFieldValue('ADV_ID'),
          title: block.getFieldValue('TITLE'),
          desc: block.getFieldValue('DESC'),
          icon: block.getFieldValue('ICON'),
          trigger: block.getFieldValue('TRIGGER'),
          parent: block.getFieldValue('PARENT')
        });
        break;
      case 'register_container_block':
        this.containers.push(this._extractContainerBlock(block));
        this.blocks.push(this._extractContainerBlock(block));
        break;
      case 'register_enchantment':
        this.enchantments.push(this._extractEnchantment(block));
        break;
      case 'register_status_effect':
        this.statusEffects.push({
          id: block.getFieldValue('EFFECT_ID'),
          name: block.getFieldValue('EFFECT_NAME'),
          color: block.getFieldValue('COLOR'),
          beneficial: block.getFieldValue('BENEFICIAL') === 'TRUE'
        });
        break;
      case 'register_throwable':
        this.throwables.push({
          id: block.getFieldValue('ITEM_ID'),
          name: block.getFieldValue('ITEM_NAME'),
          damage: Number(block.getFieldValue('DAMAGE') || 0)
        });
        this.items.push({ type: 'item', id: block.getFieldValue('ITEM_ID'), name: block.getFieldValue('ITEM_NAME'), maxCount: 16, rarity: 'UNCOMMON', isFood: false });
        break;
      case 'register_sound':
        this.customSounds.push({
          id: block.getFieldValue('SOUND_ID'),
          file: block.getFieldValue('FILE') || block.getFieldValue('SOUND_ID')
        });
        break;
      case 'register_painting':
        this.paintings.push({
          id: block.getFieldValue('PAINTING_ID'),
          name: block.getFieldValue('PAINTING_NAME'),
          width: Number(block.getFieldValue('WIDTH') || 16),
          height: Number(block.getFieldValue('HEIGHT') || 16)
        });
        break;
      case 'register_banner_pattern':
        this.bannerPatterns.push({
          id: block.getFieldValue('PATTERN_ID'),
          name: block.getFieldValue('PATTERN_NAME')
        });
        break;
      case 'register_fluid':
        this.fluids.push({
          id: block.getFieldValue('FLUID_ID'),
          name: block.getFieldValue('FLUID_NAME'),
          luminance: Number(block.getFieldValue('LUMINANCE') || 0)
        });
        break;
      case 'register_dimension':
        this.dimensions.push({
          id: block.getFieldValue('DIM_ID'),
          name: block.getFieldValue('DIM_NAME'),
          skyColor: block.getFieldValue('SKY_COLOR')
        });
        break;
    }
  }

  _extractContainerBlock(block) {
    const slots = Number(block.getFieldValue('SLOTS') || block.getFieldValue('SIZE') || 27);
    return {
      type: 'container',
      id: block.getFieldValue('BLOCK_ID'),
      name: block.getFieldValue('BLOCK_NAME'),
      hardness: block.getFieldValue('HARDNESS') || 3,
      resistance: block.getFieldValue('RESISTANCE') || 3,
      slots,
      rows: Number(block.getFieldValue('ROWS') || Math.max(1, Math.ceil(slots / 9))),
      hasItem: true
    };
  }

  _extractEnchantment(block) {
    return {
      id: block.getFieldValue('ENCH_ID'),
      name: block.getFieldValue('ENCH_NAME'),
      maxLevel: Number(block.getFieldValue('MAX_LEVEL') || 1),
      rarity: block.getFieldValue('RARITY') || 'COMMON',
      target: block.getFieldValue('TARGET') || 'WEAPON'
    };
  }

  _extractCommand(block) {
    return {
      type: 'simple',
      name: block.getFieldValue('COMMAND_NAME') || block.getFieldValue('COMMAND'),
      permission: block.getFieldValue('PERMISSION') || '0',
      actions: this._extractActions(block.getInputTargetBlock('ACTIONS'))
    };
  }

  _extractCommandWithArg(block) {
    return {
      type: 'with_arg',
      name: block.getFieldValue('COMMAND_NAME') || block.getFieldValue('COMMAND'),
      argName: block.getFieldValue('ARG_NAME'),
      argType: block.getFieldValue('ARG_TYPE'),
      permission: block.getFieldValue('PERMISSION') || '0',
      actions: this._extractActions(block.getInputTargetBlock('ACTIONS'))
    };
  }

  _extractItem(block) {
    const item = {
      type: 'item',
      id: block.getFieldValue('ITEM_ID'),
      name: block.getFieldValue('ITEM_NAME'),
      maxCount: block.getFieldValue('MAX_COUNT'),
      rarity: block.getFieldValue('RARITY'),
      isFood: block.getFieldValue('IS_FOOD') === 'TRUE'
    };
    if (item.isFood) {
      const foodBlock = block.getInputTargetBlock('FOOD_PROPS');
      if (foodBlock && foodBlock.type === 'item_food') {
        item.food = {
          hunger: foodBlock.getFieldValue('HUNGER'),
          saturation: foodBlock.getFieldValue('SATURATION'),
          alwaysEdible: foodBlock.getFieldValue('ALWAYS_EDIBLE') === 'TRUE'
        };
      }
    }
    return item;
  }

  _extractToolItem(block) {
    return {
      type: 'tool',
      id: block.getFieldValue('ITEM_ID'),
      name: block.getFieldValue('ITEM_NAME'),
      toolType: block.getFieldValue('TOOL_TYPE'),
      material: block.getFieldValue('MATERIAL'),
      attackDamage: block.getFieldValue('ATTACK_DAMAGE'),
      attackSpeed: block.getFieldValue('ATTACK_SPEED')
    };
  }

  _extractBlock(block) {
    return {
      type: 'block',
      id: block.getFieldValue('BLOCK_ID'),
      name: block.getFieldValue('BLOCK_NAME'),
      hardness: block.getFieldValue('HARDNESS'),
      resistance: block.getFieldValue('RESISTANCE'),
      luminance: block.getFieldValue('LUMINANCE'),
      slipperiness: block.getFieldValue('SLIPPERINESS'),
      tool: block.getFieldValue('TOOL'),
      miningLevel: block.getFieldValue('MINING_LEVEL'),
      hasItem: block.getFieldValue('HAS_ITEM') === 'TRUE'
    };
  }

  _extractOreBlock(block) {
    return {
      type: 'ore',
      id: block.getFieldValue('BLOCK_ID'),
      name: block.getFieldValue('BLOCK_NAME'),
      hardness: block.getFieldValue('HARDNESS'),
      resistance: block.getFieldValue('RESISTANCE'),
      xpMin: block.getFieldValue('XP_MIN'),
      xpMax: block.getFieldValue('XP_MAX'),
      hasItem: block.getFieldValue('HAS_ITEM') === 'TRUE'
    };
  }

  _extractShapedRecipe(block) {
    const keys = {};
    let keyBlock = block.getInputTargetBlock('KEYS');
    while (keyBlock) {
      keys[keyBlock.getFieldValue('KEY')] = keyBlock.getFieldValue('ITEM');
      keyBlock = keyBlock.getNextBlock();
    }
    return {
      type: 'shaped',
      result: block.getFieldValue('RESULT'),
      count: block.getFieldValue('COUNT'),
      pattern: [
        block.getFieldValue('PATTERN1'),
        block.getFieldValue('PATTERN2'),
        block.getFieldValue('PATTERN3')
      ],
      keys
    };
  }

  _extractShapelessRecipe(block) {
    const ingredients = [];
    let ingBlock = block.getInputTargetBlock('INGREDIENTS');
    while (ingBlock) {
      ingredients.push(ingBlock.getFieldValue('ITEM'));
      ingBlock = ingBlock.getNextBlock();
    }
    return {
      type: 'shapeless',
      result: block.getFieldValue('RESULT'),
      count: block.getFieldValue('COUNT'),
      ingredients
    };
  }

  _extractSmeltingRecipe(block) {
    return {
      type: 'smelting',
      smeltType: block.getFieldValue('TYPE'),
      input: block.getFieldValue('INPUT'),
      output: block.getFieldValue('OUTPUT'),
      xp: block.getFieldValue('XP'),
      cookingTime: block.getFieldValue('COOKING_TIME')
    };
  }

  _extractEvent(block) {
    const event = {
      type: block.type,
      actions: this._extractActions(block.getInputTargetBlock('ACTIONS'))
    };
    switch (block.type) {
      case 'on_item_use':
        event.itemId = block.getFieldValue('ITEM_ID');
        break;
      case 'on_block_break':
      case 'on_block_place':
      case 'on_block_interact':
        event.blockId = block.getFieldValue('BLOCK_ID');
        break;
      case 'on_entity_death':
        event.entity = block.getFieldValue('ENTITY');
        break;
      case 'on_server_tick':
        event.interval = block.getFieldValue('INTERVAL');
        break;
      case 'on_player_death':
      case 'on_player_respawn':
      case 'on_player_damage':
      case 'on_player_attack':
        break;
    }
    return event;
  }

  _extractActions(block) {
    const actions = [];
    while (block) {
      const action = { type: block.type };
      switch (block.type) {
        case 'action_give_item':
          action.item = block.getFieldValue('ITEM');
          action.count = block.getFieldValue('COUNT');
          break;
        case 'action_send_message':
          action.message = block.getFieldValue('MESSAGE');
          action.color = block.getFieldValue('COLOR');
          break;
        case 'action_play_sound':
          action.sound = block.getFieldValue('SOUND');
          action.volume = block.getFieldValue('VOLUME');
          action.pitch = block.getFieldValue('PITCH');
          break;
        case 'action_spawn_particle':
          action.particle = block.getFieldValue('PARTICLE');
          action.count = block.getFieldValue('COUNT');
          break;
        case 'action_teleport':
          action.x = block.getFieldValue('X');
          action.y = block.getFieldValue('Y');
          action.z = block.getFieldValue('Z');
          break;
        case 'action_apply_effect':
          action.effect = block.getFieldValue('EFFECT');
          action.duration = block.getFieldValue('DURATION');
          action.amplifier = block.getFieldValue('AMPLIFIER');
          break;
        case 'action_execute_command':
          action.command = block.getFieldValue('COMMAND');
          break;
        case 'action_set_block':
          action.block = block.getFieldValue('BLOCK');
          action.x = block.getFieldValue('X');
          action.y = block.getFieldValue('Y');
          action.z = block.getFieldValue('Z');
          break;
        case 'action_explosion':
          action.power = block.getFieldValue('POWER');
          action.fire = block.getFieldValue('FIRE') === 'TRUE';
          break;
        case 'condition_if':
          action.condition = this._extractCondition(block.getInputTargetBlock('CONDITION'));
          action.doActions = this._extractActions(block.getInputTargetBlock('DO'));
          break;
        case 'condition_if_else':
          action.condition = this._extractCondition(block.getInputTargetBlock('CONDITION'));
          action.doActions = this._extractActions(block.getInputTargetBlock('DO'));
          action.elseActions = this._extractActions(block.getInputTargetBlock('ELSE'));
          break;
        // Variable actions
        case 'var_declare_number':
          action.varName = block.getFieldValue('VAR_NAME');
          action.value = block.getFieldValue('VALUE');
          action.varType = 'int';
          this.variables.add(action.varName);
          break;
        case 'var_declare_string':
          action.varName = block.getFieldValue('VAR_NAME');
          action.value = block.getFieldValue('VALUE');
          action.varType = 'String';
          this.variables.add(action.varName);
          break;
        case 'var_declare_bool':
          action.varName = block.getFieldValue('VAR_NAME');
          action.value = block.getFieldValue('VALUE') === 'TRUE';
          action.varType = 'boolean';
          this.variables.add(action.varName);
          break;
        case 'var_set_number':
        case 'var_set_string':
          action.varName = block.getFieldValue('VAR_NAME');
          action.value = block.getFieldValue('VALUE');
          break;
        case 'var_set_bool':
          action.varName = block.getFieldValue('VAR_NAME');
          action.value = block.getFieldValue('VALUE') === 'TRUE';
          break;
        case 'var_add':
          action.varName = block.getFieldValue('VAR_NAME');
          action.value = block.getFieldValue('VALUE');
          break;
        // New actions
        case 'action_broadcast':
          action.message = block.getFieldValue('MESSAGE');
          action.color = block.getFieldValue('COLOR');
          break;
        case 'action_title':
          action.title = block.getFieldValue('TITLE');
          action.subtitle = block.getFieldValue('SUBTITLE');
          break;
        case 'action_actionbar':
          action.message = block.getFieldValue('MESSAGE');
          break;
        case 'action_heal':
          action.amount = block.getFieldValue('AMOUNT');
          break;
        case 'action_feed':
          action.amount = block.getFieldValue('AMOUNT');
          break;
        case 'action_set_gamemode':
          action.mode = block.getFieldValue('MODE');
          break;
        case 'action_xp':
          action.xpType = block.getFieldValue('TYPE');
          action.amount = block.getFieldValue('AMOUNT');
          break;
        case 'action_clear_effects':
          break;
        case 'command_reply':
          action.message = block.getFieldValue('MESSAGE');
          break;
        case 'loop_repeat':
          action.times = block.getFieldValue('TIMES') || block.getFieldValue('COUNT');
          action.doActions = this._extractActions(block.getInputTargetBlock('DO') || block.getInputTargetBlock('ACTIONS'));
          break;
        case 'action_delay':
          action.delay = block.getFieldValue('DELAY') || block.getFieldValue('TICKS');
          action.delayedActions = this._extractActions(block.getInputTargetBlock('ACTIONS'));
          break;
        // 動的変数代入
        case 'var_set_from_value':
        case 'var_set_number_from_value':
          action.varName = block.getFieldValue('VAR_NAME');
          action.valueExpr = this._extractValueExpr(block.getInputTargetBlock('VALUE'));
          this.variables.add(action.varName);
          break;
        // 動的メッセージ送信
        case 'action_send_message_dynamic':
          action.messageExpr = this._extractValueExpr(block.getInputTargetBlock('MESSAGE'));
          action.color = block.getFieldValue('COLOR');
          break;
        case 'action_spawn_entity':
          action.entity = block.getFieldValue('ENTITY');
          action.x = block.getFieldValue('X');
          action.y = block.getFieldValue('Y');
          action.z = block.getFieldValue('Z');
          break;
        case 'action_grant_advancement':
          action.advId = block.getFieldValue('ADV_ID');
          break;
        case 'action_open_gui':
          action.screenId = block.getFieldValue('SCREEN_ID');
          break;
        case 'action_cooldown':
          action.item = block.getFieldValue('ITEM');
          action.seconds = block.getFieldValue('SECONDS');
          break;
        case 'action_play_custom_sound':
          action.soundId = block.getFieldValue('SOUND_ID');
          break;
        case 'action_drop_item':
          action.item = block.getFieldValue('ITEM');
          action.count = block.getFieldValue('COUNT');
          break;
        case 'action_damage_item':
          action.amount = block.getFieldValue('AMOUNT');
          break;
        case 'action_set_weather':
          action.weather = block.getFieldValue('WEATHER');
          break;
        case 'action_set_time':
          action.time = block.getFieldValue('TIME');
          break;
        case 'action_announce':
          action.title = block.getFieldValue('TITLE');
          action.subtitle = block.getFieldValue('SUBTITLE');
          action.sound = block.getFieldValue('SOUND');
          break;
        case 'action_scoreboard_add':
          action.objective = block.getFieldValue('OBJECTIVE');
          action.value = block.getFieldValue('VALUE');
          break;
        case 'action_nearby_players':
          action.radius = block.getFieldValue('RADIUS');
          action.doActions = this._extractActions(block.getInputTargetBlock('ACTIONS'));
          break;
        case 'action_random_pick':
          action.aActions = this._extractActions(block.getInputTargetBlock('A'));
          action.bActions = this._extractActions(block.getInputTargetBlock('B'));
          break;
        // Mega batch
        case 'action_bossbar_show':
          action.text = block.getFieldValue('TEXT'); action.color = block.getFieldValue('COLOR');
          action.progress = block.getFieldValue('PROGRESS'); break;
        case 'action_bossbar_hide': break;
        case 'action_particle_circle':
          action.particle = block.getFieldValue('PARTICLE');
          action.radius = block.getFieldValue('RADIUS'); action.count = block.getFieldValue('COUNT'); break;
        case 'action_particle_line':
          action.particle = block.getFieldValue('PARTICLE');
          action.dx = block.getFieldValue('DX'); action.dy = block.getFieldValue('DY');
          action.dz = block.getFieldValue('DZ'); action.length = block.getFieldValue('LENGTH'); break;
        case 'action_firework':
          action.color = block.getFieldValue('COLOR'); action.shape = block.getFieldValue('SHAPE');
          action.power = block.getFieldValue('POWER');
          action.twinkle = block.getFieldValue('TWINKLE') === 'TRUE'; break;
        case 'action_lightning':
          action.x = block.getFieldValue('X'); action.z = block.getFieldValue('Z');
          action.damage = block.getFieldValue('DAMAGE') === 'TRUE'; break;
        case 'action_modify_attribute':
          action.attribute = block.getFieldValue('ATTRIBUTE');
          action.op = block.getFieldValue('OP'); action.value = block.getFieldValue('VALUE'); break;
        case 'action_clear_inventory': break;
        case 'action_set_slot':
          action.slot = block.getFieldValue('SLOT'); action.item = block.getFieldValue('ITEM');
          action.count = block.getFieldValue('COUNT'); break;
        case 'action_spawn_armor_stand':
          action.x = block.getFieldValue('X'); action.y = block.getFieldValue('Y');
          action.z = block.getFieldValue('Z'); action.name = block.getFieldValue('NAME');
          action.invisible = block.getFieldValue('INVISIBLE') === 'TRUE'; break;
        case 'action_tablist':
          action.header = block.getFieldValue('HEADER'); action.footer = block.getFieldValue('FOOTER'); break;
        case 'action_launch':
          action.x = block.getFieldValue('X'); action.y = block.getFieldValue('Y');
          action.z = block.getFieldValue('Z'); break;
        case 'action_set_velocity':
          action.x = block.getFieldValue('X'); action.y = block.getFieldValue('Y');
          action.z = block.getFieldValue('Z'); break;
        case 'action_freeze':
          action.ticks = block.getFieldValue('TICKS'); break;
        case 'action_set_fire':
          action.seconds = block.getFieldValue('SECONDS'); break;
        case 'action_extinguish': break;
        case 'action_consume_item':
          action.item = block.getFieldValue('ITEM'); action.count = block.getFieldValue('COUNT'); break;
        case 'action_no_fall_damage':
          action.seconds = block.getFieldValue('SECONDS'); break;
        case 'action_set_saturation':
          action.food = block.getFieldValue('FOOD'); action.sat = block.getFieldValue('SAT'); break;
        case 'action_fill_blocks':
          action.block = block.getFieldValue('BLOCK');
          action.x1 = block.getFieldValue('X1'); action.y1 = block.getFieldValue('Y1'); action.z1 = block.getFieldValue('Z1');
          action.x2 = block.getFieldValue('X2'); action.y2 = block.getFieldValue('Y2'); action.z2 = block.getFieldValue('Z2'); break;
        case 'action_damage_player':
          action.amount = block.getFieldValue('AMOUNT'); action.damageType = block.getFieldValue('TYPE'); break;
        case 'action_for_all_players':
          action.doActions = this._extractActions(block.getInputTargetBlock('ACTIONS')); break;
        case 'action_schedule':
          action.interval = block.getFieldValue('INTERVAL'); action.times = block.getFieldValue('TIMES');
          action.doActions = this._extractActions(block.getInputTargetBlock('ACTIONS')); break;
        case 'action_send_actionbar_dynamic':
          action.textExpr = this._extractValueExpr(block.getInputTargetBlock('TEXT')); break;
        case 'action_send_title_dynamic':
          action.titleExpr = this._extractValueExpr(block.getInputTargetBlock('TITLE'));
          action.subtitleExpr = this._extractValueExpr(block.getInputTargetBlock('SUBTITLE')); break;
      }
      actions.push(action);
      block = block.getNextBlock();
    }
    return actions;
  }

  _extractGuiScreen(block) {
    const screen = {
      screenId: block.getFieldValue('SCREEN_ID'),
      title: block.getFieldValue('TITLE'),
      bgColor: block.getFieldValue('BG_COLOR'),
      width: block.getFieldValue('WIDTH'),
      height: block.getFieldValue('HEIGHT'),
      elements: []
    };
    let el = block.getInputTargetBlock('ELEMENTS');
    while (el) {
      const elem = { type: el.type };
      switch (el.type) {
        case 'gui_label':
          elem.text = el.getFieldValue('TEXT'); elem.x = el.getFieldValue('X');
          elem.y = el.getFieldValue('Y'); elem.color = el.getFieldValue('COLOR');
          elem.scale = el.getFieldValue('SCALE'); elem.shadow = el.getFieldValue('SHADOW') === 'TRUE';
          break;
        case 'gui_label_centered':
          elem.text = el.getFieldValue('TEXT'); elem.y = el.getFieldValue('Y');
          elem.color = el.getFieldValue('COLOR'); break;
        case 'gui_button':
          elem.text = el.getFieldValue('TEXT');
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.h = el.getFieldValue('H');
          elem.actions = this._extractGuiActions(el.getInputTargetBlock('ON_CLICK'));
          break;
        case 'gui_toggle':
          elem.text = el.getFieldValue('TEXT');
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.varName = el.getFieldValue('VAR_NAME'); break;
        case 'gui_slider':
          elem.label = el.getFieldValue('LABEL');
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W');
          elem.min = el.getFieldValue('MIN'); elem.max = el.getFieldValue('MAX');
          elem.defaultVal = el.getFieldValue('DEFAULT');
          elem.varName = el.getFieldValue('VAR_NAME'); break;
        case 'gui_text_field':
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.placeholder = el.getFieldValue('PLACEHOLDER');
          elem.varName = el.getFieldValue('VAR_NAME'); break;
        case 'gui_rect':
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.h = el.getFieldValue('H');
          elem.color = el.getFieldValue('COLOR');
          elem.outline = el.getFieldValue('OUTLINE') === 'TRUE'; break;
        case 'gui_separator':
          elem.y = el.getFieldValue('Y'); elem.color = el.getFieldValue('COLOR'); break;
        case 'gui_item_display':
          elem.item = el.getFieldValue('ITEM');
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y'); break;
        case 'gui_progress_bar':
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.h = el.getFieldValue('H');
          elem.color = el.getFieldValue('COLOR'); elem.varName = el.getFieldValue('VAR_NAME'); break;
        case 'gui_image':
          elem.texture = el.getFieldValue('TEXTURE');
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.h = el.getFieldValue('H'); break;
        case 'gui_dropdown':
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.options = el.getFieldValue('OPTIONS');
          elem.varName = el.getFieldValue('VAR_NAME'); break;
        case 'gui_checkbox':
          elem.text = el.getFieldValue('TEXT');
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.varName = el.getFieldValue('VAR_NAME'); break;
        case 'gui_tab_panel':
          elem.tabs = el.getFieldValue('TABS');
          elem.x = el.getFieldValue('X'); elem.y = el.getFieldValue('Y');
          elem.w = el.getFieldValue('W'); elem.h = el.getFieldValue('H');
          elem.varName = el.getFieldValue('VAR_NAME'); break;
      }
      screen.elements.push(elem);
      el = el.getNextBlock();
    }
    return screen;
  }

  _extractGuiActions(block) {
    const actions = [];
    while (block) {
      const a = { type: block.type };
      switch (block.type) {
        case 'gui_action_close': break;
        case 'gui_action_send_command': a.command = block.getFieldValue('COMMAND'); break;
        case 'gui_action_send_chat': a.message = block.getFieldValue('MESSAGE'); break;
        case 'gui_action_play_sound': a.sound = block.getFieldValue('SOUND'); break;
        case 'gui_action_set_var':
          a.varName = block.getFieldValue('VAR_NAME'); a.value = block.getFieldValue('VALUE'); break;
        case 'gui_action_open_screen': a.screenId = block.getFieldValue('SCREEN_ID'); break;
      }
      actions.push(a);
      block = block.getNextBlock();
    }
    return actions;
  }

  // 値ブロックからJava式を抽出
  _extractValueExpr(block) {
    if (!block) return { type: 'literal_string', value: '' };
    const expr = { type: block.type };
    switch (block.type) {
      // プレイヤー情報
      case 'get_player_name': break;
      case 'get_player_health': break;
      case 'get_player_max_health': break;
      case 'get_player_hunger': break;
      case 'get_player_level': break;
      case 'get_player_xp': break;
      case 'get_player_pos':
        expr.axis = block.getFieldValue('AXIS');
        break;
      case 'get_player_gamemode': break;
      // アイテム情報
      case 'get_held_item_name': break;
      case 'get_held_item_id': break;
      case 'get_held_item_count': break;
      case 'get_held_item_durability': break;
      case 'get_offhand_item_name': break;
      // ワールド情報
      case 'get_world_time': break;
      case 'get_day_count': break;
      case 'get_weather': break;
      case 'get_biome': break;
      case 'get_dimension_name': break;
      case 'get_light_level': break;
      case 'get_block_at_pos':
        expr.x = this._extractValueExpr(block.getInputTargetBlock('X'));
        expr.y = this._extractValueExpr(block.getInputTargetBlock('Y'));
        expr.z = this._extractValueExpr(block.getInputTargetBlock('Z'));
        break;
      case 'get_online_count': break;
      case 'get_server_tps': break;
      // 値
      case 'text_value':
        expr.text = block.getFieldValue('TEXT');
        break;
      case 'number_value':
        expr.num = block.getFieldValue('NUM');
        break;
      case 'mc_text_join':
        expr.a = this._extractValueExpr(block.getInputTargetBlock('A'));
        expr.b = this._extractValueExpr(block.getInputTargetBlock('B'));
        break;
      case 'number_to_text':
        expr.inner = this._extractValueExpr(block.getInputTargetBlock('NUM'));
        break;
      case 'math_operation':
        expr.a = this._extractValueExpr(block.getInputTargetBlock('A'));
        expr.op = block.getFieldValue('OP');
        expr.b = this._extractValueExpr(block.getInputTargetBlock('B'));
        break;
      case 'math_random':
        expr.min = block.getFieldValue('MIN');
        expr.max = block.getFieldValue('MAX');
        break;
      case 'var_get_number':
      case 'var_get_string':
      case 'var_get_bool':
        expr.varName = block.getFieldValue('VAR_NAME');
        break;
      // 旧互換ブロック
      case 'player_name': break;
      case 'player_pos_x': expr.axis = 'X'; expr.type = 'get_player_pos'; break;
      case 'player_pos_y': expr.axis = 'Y'; expr.type = 'get_player_pos'; break;
      case 'player_pos_z': expr.axis = 'Z'; expr.type = 'get_player_pos'; break;
      case 'player_health': expr.type = 'get_player_health'; break;
      default:
        expr.type = 'literal_string';
        expr.value = '';
    }
    return expr;
  }

  _extractCondition(block) {
    if (!block) return { type: 'true' };
    const cond = { type: block.type };
    switch (block.type) {
      case 'check_sneaking':
        break;
      case 'check_holding_item':
        cond.item = block.getFieldValue('ITEM');
        break;
      case 'check_dimension':
        cond.dimension = block.getFieldValue('DIMENSION');
        break;
      case 'check_time':
        cond.time = block.getFieldValue('TIME');
        break;
      case 'check_health':
        cond.op = block.getFieldValue('OP');
        cond.value = block.getFieldValue('VALUE');
        break;
      case 'logic_and':
        cond.a = this._extractCondition(block.getInputTargetBlock('A'));
        cond.b = this._extractCondition(block.getInputTargetBlock('B'));
        break;
      case 'logic_or':
        cond.a = this._extractCondition(block.getInputTargetBlock('A'));
        cond.b = this._extractCondition(block.getInputTargetBlock('B'));
        break;
      case 'logic_not':
        cond.inner = this._extractCondition(block.getInputTargetBlock('BOOL'));
        break;
      case 'random_chance':
        cond.chance = block.getFieldValue('CHANCE');
        break;
      case 'var_compare':
        cond.varName = block.getFieldValue('VAR_NAME');
        cond.op = block.getFieldValue('OP');
        cond.value = block.getFieldValue('VALUE');
        break;
      case 'var_string_equals':
        cond.varName = block.getFieldValue('VAR_NAME');
        cond.value = block.getFieldValue('VALUE');
        break;
      case 'var_get_bool':
        cond.varName = block.getFieldValue('VAR_NAME');
        break;
      case 'check_in_area':
        cond.x1 = block.getFieldValue('X1'); cond.x2 = block.getFieldValue('X2');
        cond.y1 = block.getFieldValue('Y1'); cond.y2 = block.getFieldValue('Y2');
        cond.z1 = block.getFieldValue('Z1'); cond.z2 = block.getFieldValue('Z2');
        break;
      case 'check_biome':
        cond.biome = block.getFieldValue('BIOME');
        break;
      case 'check_weather':
        cond.weather = block.getFieldValue('WEATHER'); break;
      case 'check_has_permission':
        cond.level = block.getFieldValue('LEVEL'); break;
      case 'check_on_ground': break;
      case 'check_in_water': break;
      case 'check_in_lava': break;
      case 'check_is_flying': break;
      case 'check_is_sprinting': break;
      case 'check_is_swimming': break;
      case 'check_has_effect':
        cond.effect = block.getFieldValue('EFFECT'); break;
      case 'check_item_count':
        cond.item = block.getFieldValue('ITEM'); cond.count = block.getFieldValue('COUNT'); break;
      case 'check_armor_wearing':
        cond.slot = block.getFieldValue('SLOT'); cond.item = block.getFieldValue('ITEM'); break;
    }
    return cond;
  }

  // ===== CODE GENERATION =====

  _generateMainClass(pkg, className) {
    let code = `package ${pkg};\n\n`;
    code += `import net.fabricmc.api.ModInitializer;\n`;
    code += `import org.slf4j.Logger;\n`;
    code += `import org.slf4j.LoggerFactory;\n\n`;
    code += `public class ${className}Mod implements ModInitializer {\n`;
    code += `    public static final String MOD_ID = "${this.modId}";\n`;
    code += `    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);\n\n`;
    code += `    @Override\n`;
    code += `    public void onInitialize() {\n`;
    code += `        LOGGER.info("Initializing ${this.modName}");\n`;
    if (this.items.length > 0) {
      code += `        ModItems.registerItems();\n`;
    }
    if (this.blocks.length > 0) {
      code += `        ModBlocks.registerBlocks();\n`;
    }
    if (this.events.length > 0) {
      code += `        ModEvents.registerEvents();\n`;
    }
    if (this.commands.length > 0) {
      code += `        ModCommands.registerCommands();\n`;
    }
    if (this.containers.length > 0) {
      code += `        ModContainers.registerContainers();\n`;
    }
    if (this.containers.length > 0 || this.guiScreens.length > 0) {
      code += `        ModSync.registerSync();\n`;
    }
    if (this.tooltips.length > 0) {
      code += `\n        // アイテムツールチップ登録\n`;
      code += `        net.fabricmc.fabric.api.client.item.v1.ItemTooltipCallback.EVENT.register((stack, context, type, lines) -> {\n`;
      for (const tt of this.tooltips) {
        code += `            if (stack.getItem() == Registries.ITEM.get(Identifier.of("${this._resolveItemId(tt.itemId)}"))) {\n`;
        for (const line of tt.lines) {
          code += `                lines.add(Text.literal("${this._escapeJava(line)}").formatted(Formatting.${tt.color}));\n`;
        }
        code += `            }\n`;
      }
      code += `        });\n`;
    }
    if (this.creativeTabs.length > 0) {
      code += `\n        // カスタムクリエイティブタブ\n`;
      for (const tab of this.creativeTabs) {
        code += `        net.fabricmc.fabric.api.itemgroup.v1.FabricItemGroup.builder(Identifier.of("${this.modId}", "${tab.tabId}"))\n`;
        code += `            .displayName(Text.literal("${this._escapeJava(tab.tabName)}"))\n`;
        code += `            .icon(() -> new ItemStack(Registries.ITEM.get(Identifier.of("${this._resolveItemId(tab.iconItem)}"))))\n`;
        code += `            .entries((context, entries) -> {\n`;
        for (const item of this.items) {
          code += `                entries.add(ModItems.${item.id.toUpperCase()});\n`;
        }
        for (const blk of this.blocks) {
          if (blk.hasItem) code += `                entries.add(ModBlocks.${blk.id.toUpperCase()});\n`;
        }
        code += `            })\n`;
        code += `            .build();\n`;
      }
    }
    if (this.oreGens.length > 0) {
      code += `\n        // 鉱石ワールド生成\n`;
      code += `        ModWorldGen.registerOreGen();\n`;
    }
    code += `    }\n`;
    // (変数はModVars.javaに別ファイルとして生成)
    code += `}\n`;

    // 追加import
    let imports = `import net.fabricmc.api.ModInitializer;\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\n`;
    if (this.tooltips.length > 0 || this.creativeTabs.length > 0) {
      imports += `import net.minecraft.item.ItemStack;\n`;
      imports += `import net.minecraft.registry.Registries;\n`;
      imports += `import net.minecraft.text.Text;\n`;
      imports += `import net.minecraft.util.Formatting;\n`;
      imports += `import net.minecraft.util.Identifier;\n`;
    }
    code = code.replace(
      'import net.fabricmc.api.ModInitializer;\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\n',
      imports
    );

    return code;
  }

  _generateContainersClass(pkg, className) {
    if (this.containers.length === 0) return '// No container blocks defined.';
    let code = `package ${pkg};\n\n`;
    code += `import org.slf4j.Logger;\n`;
    code += `import org.slf4j.LoggerFactory;\n\n`;
    code += `public class ModContainers {\n`;
    code += `    private static final Logger LOGGER = LoggerFactory.getLogger("${this.modId}/containers");\n\n`;
    code += `    public static void registerContainers() {\n`;
    code += `        LOGGER.info("Registering container support for ${this.containers.length} block(s)");\n`;
    for (const container of this.containers) {
      code += `        LOGGER.info("Container block: ${container.id} (${container.slots} slots / ${container.rows} rows)");\n`;
    }
    code += `    }\n`;
    code += `}\n`;
    return code;
  }

  _generateSyncClass(pkg, className) {
    if (this.containers.length === 0 && this.guiScreens.length === 0) return '// No sync helpers required.';
    let code = `package ${pkg};\n\n`;
    code += `import java.util.Map;\n`;
    code += `import java.util.concurrent.ConcurrentHashMap;\n`;
    code += `import org.slf4j.Logger;\n`;
    code += `import org.slf4j.LoggerFactory;\n\n`;
    code += `public class ModSync {\n`;
    code += `    private static final Logger LOGGER = LoggerFactory.getLogger("${this.modId}/sync");\n`;
    code += `    private static final Map<String, String> STRING_STATE = new ConcurrentHashMap<>();\n`;
    code += `    private static final Map<String, Double> NUMBER_STATE = new ConcurrentHashMap<>();\n\n`;
    code += `    public static void registerSync() {\n`;
    code += `        LOGGER.info("Initializing sync helpers for ${className}");\n`;
    code += `    }\n\n`;
    code += `    public static void requestOpenScreen(String screenId, String playerId) {\n`;
    code += `        LOGGER.info("Requested GUI open: {} for {}", screenId, playerId);\n`;
    code += `        putString("open_screen:" + playerId, screenId);\n`;
    code += `    }\n\n`;
    code += `    public static void putString(String key, String value) {\n`;
    code += `        STRING_STATE.put(key, value);\n`;
    code += `    }\n\n`;
    code += `    public static String getString(String key, String fallback) {\n`;
    code += `        return STRING_STATE.getOrDefault(key, fallback);\n`;
    code += `    }\n\n`;
    code += `    public static void putNumber(String key, double value) {\n`;
    code += `        NUMBER_STATE.put(key, value);\n`;
    code += `    }\n\n`;
    code += `    public static double getNumber(String key, double fallback) {\n`;
    code += `        return NUMBER_STATE.getOrDefault(key, fallback);\n`;
    code += `    }\n`;
    code += `}\n`;
    return code;
  }

  _generateItemsClass(pkg) {
    if (this.items.length === 0 && this.armorSets.length === 0) return '// アイテムブロックを追加するとコードが生成されます';

    const hasTools = this.items.some(i => i.type === 'tool');
    const hasFood = this.items.some(i => i.isFood);
    const hasArmor = this.armorSets.length > 0;

    let code = `package ${pkg};\n\n`;
    code += `import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;\n`;
    if (hasFood) code += `import net.minecraft.component.type.FoodComponent;\n`;
    code += `import net.minecraft.item.Item;\n`;
    code += `import net.minecraft.item.ItemGroups;\n`;
    if (hasTools) {
      code += `import net.minecraft.item.SwordItem;\n`;
      code += `import net.minecraft.item.PickaxeItem;\n`;
      code += `import net.minecraft.item.AxeItem;\n`;
      code += `import net.minecraft.item.ShovelItem;\n`;
      code += `import net.minecraft.item.HoeItem;\n`;
      if (this._isModern()) {
        code += `import net.minecraft.item.ToolMaterial;\n`;
      } else {
        code += `import net.minecraft.item.ToolMaterials;\n`;
      }
    }
    if (hasArmor) {
      code += `import net.minecraft.item.ArmorItem;\n`;
      if (this._isModern()) {
        code += `import net.minecraft.item.equipment.ArmorMaterials;\n`;
      } else {
        code += `import net.minecraft.item.ArmorMaterials;\n`;
      }
    }
    code += `import net.minecraft.registry.Registries;\n`;
    code += `import net.minecraft.registry.Registry;\n`;
    code += `import net.minecraft.util.Identifier;\n`;
    code += `import net.minecraft.util.Rarity;\n\n`;
    code += `public class ModItems {\n\n`;

    // Item declarations
    for (const item of this.items) {
      const constName = item.id.toUpperCase();
      if (item.type === 'tool') {
        const toolClassMap = { SWORD: 'SwordItem', PICKAXE: 'PickaxeItem', AXE: 'AxeItem', SHOVEL: 'ShovelItem', HOE: 'HoeItem' };
        if (this._isModern()) {
          code += `    public static final Item ${constName} = new ${toolClassMap[item.toolType]}(\n`;
          code += `        ToolMaterial.${item.material},\n`;
          code += `        ${item.attackDamage}f,\n`;
          code += `        ${item.attackSpeed}f,\n`;
          code += `        new Item.Settings()\n`;
          code += `    );\n\n`;
        } else {
          code += `    public static final Item ${constName} = new ${toolClassMap[item.toolType]}(\n`;
          code += `        ToolMaterials.${item.material},\n`;
          code += `        (int)${item.attackDamage},\n`;
          code += `        ${item.attackSpeed}f,\n`;
          code += `        new Item.Settings()\n`;
          code += `    );\n\n`;
        }
      } else {
        code += `    public static final Item ${constName} = new Item(\n`;
        code += `        new Item.Settings()\n`;
        code += `            .maxCount(${item.maxCount})\n`;
        code += `            .rarity(Rarity.${item.rarity})`;
        if (item.isFood && item.food) {
          if (this._isModern()) {
            code += `\n            .food(new FoodComponent(${item.food.hunger}, ${item.food.saturation}f, ${item.food.alwaysEdible || false}))`;
          } else {
            code += `\n            .food(new FoodComponent.Builder()\n`;
            code += `                .hunger(${item.food.hunger})\n`;
            code += `                .saturationModifier(${item.food.saturation}f)`;
            if (item.food.alwaysEdible) code += `\n                .alwaysEdible()`;
            code += `\n                .build())`;
          }
        }
        code += `\n    );\n\n`;
      }
    }

    // Armor sets
    const armorParts = ['helmet', 'chestplate', 'leggings', 'boots'];
    const armorSlots = ['HELMET', 'CHESTPLATE', 'LEGGINGS', 'BOOTS'];
    const armorDefKey = ['helmetDef', 'chestDef', 'legsDef', 'bootsDef'];
    for (const armor of this.armorSets) {
      for (let i = 0; i < 4; i++) {
        const id = `${armor.idPrefix}_${armorParts[i]}`;
        const constName = id.toUpperCase();
        code += `    public static final Item ${constName} = new ArmorItem(\n`;
        code += `        ArmorMaterials.${armor.baseMaterial},\n`;
        code += `        ArmorItem.Type.${armorSlots[i]},\n`;
        code += `        new Item.Settings()\n`;
        code += `    );\n\n`;
      }
    }

    // Registration method
    code += `    public static void registerItems() {\n`;
    for (const item of this.items) {
      const constName = item.id.toUpperCase();
      code += `        Registry.register(Registries.ITEM, Identifier.of("${this.modId}", "${item.id}"), ${constName});\n`;
    }
    for (const armor of this.armorSets) {
      for (const part of armorParts) {
        const id = `${armor.idPrefix}_${part}`;
        code += `        Registry.register(Registries.ITEM, Identifier.of("${this.modId}", "${id}"), ${id.toUpperCase()});\n`;
      }
    }
    code += `\n        // クリエイティブタブに追加\n`;
    code += `        ItemGroupEvents.modifyEntriesEvent(ItemGroups.COMBAT).register(entries -> {\n`;
    for (const item of this.items) {
      code += `            entries.add(${item.id.toUpperCase()});\n`;
    }
    for (const armor of this.armorSets) {
      for (const part of armorParts) {
        code += `            entries.add(${(armor.idPrefix + '_' + part).toUpperCase()});\n`;
      }
    }
    code += `        });\n`;
    code += `    }\n`;
    code += `}\n`;
    return code;
  }

  _generateBlocksClass(pkg) {
    if (this.blocks.length === 0) return '// ブロック定義ブロックを追加するとコードが生成されます';

    let code = `package ${pkg};\n\n`;
    code += `import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;\n`;
    code += `import net.minecraft.block.AbstractBlock;\n`;
    code += `import net.minecraft.block.Block;\n`;
    code += `import net.minecraft.block.ExperienceDroppingBlock;\n`;
    code += `import net.minecraft.item.BlockItem;\n`;
    code += `import net.minecraft.item.Item;\n`;
    code += `import net.minecraft.item.ItemGroups;\n`;
    code += `import net.minecraft.registry.Registries;\n`;
    code += `import net.minecraft.registry.Registry;\n`;
    code += `import net.minecraft.util.Identifier;\n`;
    code += `import net.minecraft.util.math.intprovider.UniformIntProvider;\n\n`;
    code += `public class ModBlocks {\n\n`;

    // Block declarations
    for (const blk of this.blocks) {
      const constName = blk.id.toUpperCase();
      if (blk.type === 'ore') {
        code += `    public static final Block ${constName} = new ExperienceDroppingBlock(\n`;
        code += `        UniformIntProvider.create(${blk.xpMin}, ${blk.xpMax}),\n`;
        code += `        AbstractBlock.Settings.create()\n`;
        code += `            .strength(${blk.hardness}f, ${blk.resistance}f)\n`;
        code += `            .requiresTool()\n`;
        code += `    );\n\n`;
      } else {
        code += `    public static final Block ${constName} = new Block(\n`;
        code += `        AbstractBlock.Settings.create()\n`;
        code += `            .strength(${blk.hardness}f, ${blk.resistance}f)`;
        if (blk.luminance > 0) {
          code += `\n            .luminance(state -> ${blk.luminance})`;
        }
        if (blk.slipperiness !== 0.6) {
          code += `\n            .slipperiness(${blk.slipperiness}f)`;
        }
        if (blk.tool !== 'NONE') {
          code += `\n            .requiresTool()`;
        }
        code += `\n    );\n\n`;
      }
    }

    // Registration
    code += `    public static void registerBlocks() {\n`;
    for (const blk of this.blocks) {
      const constName = blk.id.toUpperCase();
      code += `        Registry.register(Registries.BLOCK, Identifier.of("${this.modId}", "${blk.id}"), ${constName});\n`;
      if (blk.hasItem) {
        code += `        Registry.register(Registries.ITEM, Identifier.of("${this.modId}", "${blk.id}"),\n`;
        code += `            new BlockItem(${constName}, new Item.Settings()));\n`;
      }
    }
    code += `\n        // クリエイティブタブに追加\n`;
    code += `        ItemGroupEvents.modifyEntriesEvent(ItemGroups.BUILDING_BLOCKS).register(entries -> {\n`;
    for (const blk of this.blocks) {
      if (blk.hasItem) {
        code += `            entries.add(${blk.id.toUpperCase()});\n`;
      }
    }
    code += `        });\n`;
    code += `    }\n`;
    code += `}\n`;
    return code;
  }

  _generateEventsClass(pkg, className) {
    if (this.events.length === 0) return '// イベントブロックを追加するとコードが生成されます';

    let code = `package ${pkg};\n\n`;
    code += `import net.fabricmc.fabric.api.event.player.PlayerBlockBreakEvents;\n`;
    code += `import net.fabricmc.fabric.api.event.lifecycle.v1.ServerTickEvents;\n`;
    code += `import net.fabricmc.fabric.api.networking.v1.ServerPlayConnectionEvents;\n`;
    code += `import net.fabricmc.fabric.api.event.player.UseItemCallback;\n`;
    code += `import net.fabricmc.fabric.api.event.player.AttackBlockCallback;\n`;
    code += `import net.minecraft.entity.effect.StatusEffectInstance;\n`;
    code += `import net.minecraft.entity.effect.StatusEffects;\n`;
    code += `import net.minecraft.item.ItemStack;\n`;
    code += `import net.minecraft.item.Items;\n`;
    code += `import net.minecraft.particle.ParticleTypes;\n`;
    code += `import net.minecraft.registry.Registries;\n`;
    code += `import net.minecraft.server.network.ServerPlayerEntity;\n`;
    code += `import net.minecraft.server.world.ServerWorld;\n`;
    if (!this._isModern()) code += `import net.minecraft.sound.SoundCategory;\n`;
    code += `import net.minecraft.sound.SoundEvents;\n`;
    code += `import net.minecraft.text.Text;\n`;
    code += `import net.minecraft.util.ActionResult;\n`;
    code += `import net.minecraft.util.Formatting;\n`;
    code += `import net.minecraft.util.Identifier;\n`;
    code += `import net.minecraft.util.math.BlockPos;\n`;
    code += `import net.minecraft.block.Blocks;\n`;
    code += `import net.minecraft.world.World;\n\n`;
    code += `public class ModEvents {\n`;
    code += `    private static int tickCounter = 0;\n\n`;
    code += `    public static void registerEvents() {\n`;

    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      code += this._generateEventCode(event, i);
    }

    code += `    }\n`;
    code += `}\n`;
    return code;
  }

  _generateEventCode(event, index) {
    let code = '';
    switch (event.type) {
      case 'on_item_use':
        code += `\n        // アイテム使用イベント: ${event.itemId}\n`;
        code += `        UseItemCallback.EVENT.register((player, world, hand) -> {\n`;
        code += `            ItemStack stack = player.getStackInHand(hand);\n`;
        code += `            if (stack.getItem() == Registries.ITEM.get(Identifier.of("${this._resolveItemId(event.itemId)}"))`;
        code += ` && player instanceof ServerPlayerEntity serverPlayer) {\n`;
        code += `                ServerWorld serverWorld = (ServerWorld) world;\n`;
        code += this._generateActionsCode(event.actions, '                ', 'serverPlayer', 'serverWorld');
        code += `                return ActionResult.SUCCESS;\n`;
        code += `            }\n`;
        code += `            return ActionResult.PASS;\n`;
        code += `        });\n`;
        break;

      case 'on_block_break':
        code += `\n        // ブロック破壊イベント\n`;
        code += `        PlayerBlockBreakEvents.AFTER.register((world, player, pos, state, entity) -> {\n`;
        if (event.blockId) {
          code += `            if (state.getBlock() == Registries.BLOCK.get(Identifier.of("${this._resolveItemId(event.blockId)}"))`;
          code += ` && player instanceof ServerPlayerEntity serverPlayer) {\n`;
          code += `                ServerWorld serverWorld = (ServerWorld) world;\n`;
          code += this._generateActionsCode(event.actions, '                ', 'serverPlayer', 'serverWorld');
          code += `            }\n`;
        } else {
          code += `            if (player instanceof ServerPlayerEntity serverPlayer) {\n`;
          code += `                ServerWorld serverWorld = (ServerWorld) world;\n`;
          code += this._generateActionsCode(event.actions, '                ', 'serverPlayer', 'serverWorld');
          code += `            }\n`;
        }
        code += `        });\n`;
        break;

      case 'on_player_join':
        code += `\n        // プレイヤー参加イベント\n`;
        code += `        ServerPlayConnectionEvents.JOIN.register((handler, sender, server) -> {\n`;
        code += `            ServerPlayerEntity serverPlayer = handler.getPlayer();\n`;
        code += `            ServerWorld world = serverPlayer.getServerWorld();\n`;
        code += this._generateActionsCode(event.actions, '            ', 'serverPlayer', 'world');
        code += `        });\n`;
        break;

      case 'on_server_tick':
        code += `\n        // サーバーティックイベント (${event.interval}tick間隔)\n`;
        code += `        ServerTickEvents.END_SERVER_TICK.register(server -> {\n`;
        code += `            tickCounter++;\n`;
        code += `            if (tickCounter >= ${event.interval}) {\n`;
        code += `                tickCounter = 0;\n`;
        code += `                for (ServerPlayerEntity serverPlayer : server.getPlayerManager().getPlayerList()) {\n`;
        code += `                    ServerWorld world = serverPlayer.getServerWorld();\n`;
        code += this._generateActionsCode(event.actions, '                    ', 'serverPlayer', 'world');
        code += `                }\n`;
        code += `            }\n`;
        code += `        });\n`;
        break;

      case 'on_entity_death':
        code += `\n        // エンティティ死亡イベント (${event.entity})\n`;
        code += `        // Note: Requires ServerEntityCombatEvents or Mixin for full implementation\n`;
        code += `        // Simplified: using ServerTickEvents as placeholder\n`;
        break;

      case 'on_block_place':
        code += `\n        // ブロック設置イベント\n`;
        code += `        // Note: Requires UseBlockCallback for full implementation\n`;
        break;

      case 'on_block_interact':
        code += `\n        // ブロック右クリックイベント\n`;
        code += `        net.fabricmc.fabric.api.event.player.UseBlockCallback.EVENT.register((player, world, hand, hitResult) -> {\n`;
        code += `            if (player instanceof ServerPlayerEntity serverPlayer && !world.isClient()) {\n`;
        if (event.blockId) {
          code += `                if (world.getBlockState(hitResult.getBlockPos()).getBlock() == Registries.BLOCK.get(Identifier.of("${this._resolveItemId(event.blockId)}"))) {\n`;
          code += `                    ServerWorld serverWorld = (ServerWorld) world;\n`;
          code += this._generateActionsCode(event.actions, '                    ', 'serverPlayer', 'serverWorld');
          code += `                    return ActionResult.SUCCESS;\n`;
          code += `                }\n`;
        } else {
          code += `                ServerWorld serverWorld = (ServerWorld) world;\n`;
          code += this._generateActionsCode(event.actions, '                ', 'serverPlayer', 'serverWorld');
          code += `                return ActionResult.SUCCESS;\n`;
        }
        code += `            }\n`;
        code += `            return ActionResult.PASS;\n`;
        code += `        });\n`;
        break;

      case 'on_player_death':
        code += `\n        // プレイヤー死亡イベント\n`;
        code += `        net.fabricmc.fabric.api.entity.event.v1.ServerLivingEntityEvents.AFTER_DEATH.register((entity, source) -> {\n`;
        code += `            if (entity instanceof ServerPlayerEntity serverPlayer) {\n`;
        code += `                ServerWorld world = serverPlayer.getServerWorld();\n`;
        code += this._generateActionsCode(event.actions, '                ', 'serverPlayer', 'world');
        code += `            }\n`;
        code += `        });\n`;
        break;

      case 'on_player_respawn':
        code += `\n        // プレイヤーリスポーンイベント\n`;
        code += `        net.fabricmc.fabric.api.entity.event.v1.ServerPlayerEvents.AFTER_RESPAWN.register((oldPlayer, newPlayer, alive) -> {\n`;
        code += `            ServerPlayerEntity serverPlayer = newPlayer;\n`;
        code += `            ServerWorld world = serverPlayer.getServerWorld();\n`;
        code += this._generateActionsCode(event.actions, '            ', 'serverPlayer', 'world');
        code += `        });\n`;
        break;

      case 'on_player_damage':
        code += `\n        // プレイヤーダメージイベント\n`;
        code += `        net.fabricmc.fabric.api.entity.event.v1.ServerLivingEntityEvents.ALLOW_DAMAGE.register((entity, source, amount) -> {\n`;
        code += `            if (entity instanceof ServerPlayerEntity serverPlayer) {\n`;
        code += `                ServerWorld world = serverPlayer.getServerWorld();\n`;
        code += this._generateActionsCode(event.actions, '                ', 'serverPlayer', 'world');
        code += `            }\n`;
        code += `            return true;\n`;
        code += `        });\n`;
        break;

      case 'on_player_attack':
        code += `\n        // プレイヤー攻撃イベント\n`;
        code += `        net.fabricmc.fabric.api.event.player.AttackEntityCallback.EVENT.register((player, world, hand, entity, hitResult) -> {\n`;
        code += `            if (player instanceof ServerPlayerEntity serverPlayer && !world.isClient()) {\n`;
        code += `                ServerWorld serverWorld = (ServerWorld) world;\n`;
        code += this._generateActionsCode(event.actions, '                ', 'serverPlayer', 'serverWorld');
        code += `            }\n`;
        code += `            return ActionResult.PASS;\n`;
        code += `        });\n`;
        break;
    }
    return code;
  }

  _generateActionsCode(actions, indent, playerVar, worldVar) {
    let code = '';
    for (const action of actions) {
      switch (action.type) {
        case 'action_give_item':
          code += `${indent}${playerVar}.giveItemStack(new ItemStack(Registries.ITEM.get(Identifier.of("${this._resolveItemId(action.item)}")), ${action.count}));\n`;
          break;
        case 'action_send_message':
          code += `${indent}${playerVar}.sendMessage(Text.literal("${this._escapeJava(action.message)}").formatted(Formatting.${action.color}));\n`;
          break;
        case 'action_play_sound':
          if (this._isModern()) {
            code += `${indent}${playerVar}.playSound(SoundEvents.${action.sound}, ${action.volume}f, ${action.pitch}f);\n`;
          } else {
            code += `${indent}${playerVar}.playSound(SoundEvents.${action.sound}, SoundCategory.PLAYERS, ${action.volume}f, ${action.pitch}f);\n`;
          }
          break;
        case 'action_spawn_particle':
          code += `${indent}${worldVar}.spawnParticles(ParticleTypes.${action.particle}, ${playerVar}.getX(), ${playerVar}.getY() + 1, ${playerVar}.getZ(), ${action.count}, 0.5, 0.5, 0.5, 0.05);\n`;
          break;
        case 'action_teleport':
          code += `${indent}${playerVar}.teleport(${worldVar}, ${action.x}, ${action.y}, ${action.z}, ${playerVar}.getYaw(), ${playerVar}.getPitch());\n`;
          break;
        case 'action_apply_effect':
          code += `${indent}${playerVar}.addStatusEffect(new StatusEffectInstance(StatusEffects.${action.effect}, ${action.duration * 20}, ${action.amplifier}));\n`;
          break;
        case 'action_execute_command':
          code += `${indent}${playerVar}.getServer().getCommandManager().executeWithPrefix(${playerVar}.getCommandSource(), "${this._escapeJava(action.command)}");\n`;
          break;
        case 'action_set_block':
          code += `${indent}${worldVar}.setBlockState(${playerVar}.getBlockPos().add(${action.x}, ${action.y}, ${action.z}), Registries.BLOCK.get(Identifier.of("${this._resolveItemId(action.block)}")).getDefaultState());\n`;
          break;
        case 'action_explosion':
          code += `${indent}${worldVar}.createExplosion(null, ${playerVar}.getX(), ${playerVar}.getY(), ${playerVar}.getZ(), ${action.power}f, ${action.fire}, World.ExplosionSourceType.TNT);\n`;
          break;
        case 'condition_if':
          code += `${indent}if (${this._generateConditionCode(action.condition, playerVar, worldVar)}) {\n`;
          code += this._generateActionsCode(action.doActions, indent + '    ', playerVar, worldVar);
          code += `${indent}}\n`;
          break;
        case 'condition_if_else':
          code += `${indent}if (${this._generateConditionCode(action.condition, playerVar, worldVar)}) {\n`;
          code += this._generateActionsCode(action.doActions, indent + '    ', playerVar, worldVar);
          code += `${indent}} else {\n`;
          code += this._generateActionsCode(action.elseActions || [], indent + '    ', playerVar, worldVar);
          code += `${indent}}\n`;
          break;
        // Variables
        case 'var_declare_number':
          code += `${indent}ModVars.setInt("${action.varName}", ${action.value});\n`;
          break;
        case 'var_declare_string':
          code += `${indent}ModVars.setString("${action.varName}", "${this._escapeJava(action.value)}");\n`;
          break;
        case 'var_declare_bool':
          code += `${indent}ModVars.setBool("${action.varName}", ${action.value});\n`;
          break;
        case 'var_set_number':
          code += `${indent}ModVars.setInt("${action.varName}", ${action.value});\n`;
          break;
        case 'var_set_string':
          code += `${indent}ModVars.setString("${action.varName}", "${this._escapeJava(action.value)}");\n`;
          break;
        case 'var_set_bool':
          code += `${indent}ModVars.setBool("${action.varName}", ${action.value});\n`;
          break;
        case 'var_add':
          code += `${indent}ModVars.addInt("${action.varName}", ${action.value});\n`;
          break;
        // New actions
        case 'action_broadcast':
          code += `${indent}${playerVar}.getServer().getPlayerManager().broadcast(Text.literal("${this._escapeJava(action.message)}").formatted(Formatting.${action.color}), false);\n`;
          break;
        case 'action_title':
          code += `${indent}${playerVar}.networkHandler.sendPacket(new net.minecraft.network.packet.s2c.play.TitleS2CPacket(Text.literal("${this._escapeJava(action.title)}")));\n`;
          code += `${indent}${playerVar}.networkHandler.sendPacket(new net.minecraft.network.packet.s2c.play.SubtitleS2CPacket(Text.literal("${this._escapeJava(action.subtitle)}")));\n`;
          break;
        case 'action_actionbar':
          code += `${indent}${playerVar}.sendMessage(Text.literal("${this._escapeJava(action.message)}"), true);\n`;
          break;
        case 'action_heal':
          code += `${indent}${playerVar}.setHealth(Math.min(${playerVar}.getHealth() + ${action.amount}f, ${playerVar}.getMaxHealth()));\n`;
          break;
        case 'action_feed':
          code += `${indent}${playerVar}.getHungerManager().setFoodLevel(Math.min(${playerVar}.getHungerManager().getFoodLevel() + ${action.amount}, 20));\n`;
          break;
        case 'action_set_gamemode':
          code += `${indent}${playerVar}.changeGameMode(net.minecraft.world.GameMode.${action.mode});\n`;
          break;
        case 'action_xp':
          if (action.xpType === 'POINTS') {
            code += `${indent}${playerVar}.addExperience(${action.amount});\n`;
          } else {
            code += `${indent}${playerVar}.addExperienceLevels(${action.amount});\n`;
          }
          break;
        case 'action_clear_effects':
          code += `${indent}${playerVar}.clearStatusEffects();\n`;
          break;
        case 'command_reply':
          code += `${indent}${playerVar}.sendMessage(Text.literal("${this._escapeJava(action.message)}").formatted(Formatting.GREEN));\n`;
          break;
        case 'loop_repeat':
          code += `${indent}for (int i = 0; i < ${action.times}; i++) {\n`;
          code += this._generateActionsCode(action.doActions, indent + '    ', playerVar, worldVar);
          code += `${indent}}\n`;
          break;
        case 'action_delay':
          code += `${indent}${playerVar}.getServer().execute(() -> {\n`;
          code += `${indent}    // 遅延実行 (${action.delay} ticks)\n`;
          code += this._generateActionsCode(action.delayedActions || [], indent + '    ', playerVar, worldVar);
          code += `${indent}});\n`;
          break;
        // 動的変数代入
        case 'var_set_from_value':
          code += `${indent}ModVars.setString("${action.varName}", String.valueOf(${this._generateValueExpr(action.valueExpr, playerVar, worldVar)}));\n`;
          break;
        case 'var_set_number_from_value':
          code += `${indent}ModVars.setInt("${action.varName}", (int)(${this._generateValueExpr(action.valueExpr, playerVar, worldVar)}));\n`;
          break;
        // 動的メッセージ
        case 'action_send_message_dynamic':
          code += `${indent}${playerVar}.sendMessage(Text.literal(String.valueOf(${this._generateValueExpr(action.messageExpr, playerVar, worldVar)})).formatted(Formatting.${action.color}));\n`;
          break;
        // エンティティ召喚
        case 'action_spawn_entity':
          code += `${indent}${worldVar}.spawnEntity(net.minecraft.entity.EntityType.${action.entity}.create(${worldVar}));\n`;
          code += `${indent}// 注意: 上記は簡易実装。位置は別途setPositionで設定してください\n`;
          break;
        // 進捗付与
        case 'action_grant_advancement':
          code += `${indent}// 進捗付与: ${action.advId}\n`;
          code += `${indent}var adv = ${playerVar}.getServer().getAdvancementLoader().get(Identifier.of("${this.modId}", "${action.advId}"));\n`;
          code += `${indent}if (adv != null) ${playerVar}.getAdvancementTracker().grantCriterion(adv, "trigger");\n`;
          break;
        case 'action_open_gui':
          code += `${indent}ModSync.requestOpenScreen("${this._escapeJava(action.screenId)}", ${playerVar}.getUuidAsString());\n`;
          break;
        case 'action_cooldown':
          code += `${indent}${playerVar}.getItemCooldownManager().set(Registries.ITEM.get(Identifier.of("${this._resolveItemId(action.item)}")), ${action.seconds * 20});\n`;
          break;
        case 'action_play_custom_sound':
          code += `${indent}${playerVar}.sendMessage(Text.literal("Play sound: ${this._escapeJava(action.soundId)}"), true);\n`;
          break;
        case 'action_drop_item':
          code += `${indent}${playerVar}.dropItem(Registries.ITEM.get(Identifier.of("${this._resolveItemId(action.item)}")), ${action.count});\n`;
          break;
        case 'action_damage_item':
          code += `${indent}${playerVar}.getMainHandStack().damage(${action.amount}, ${playerVar}, net.minecraft.entity.EquipmentSlot.MAINHAND);\n`;
          break;
        case 'action_set_weather':
          if (action.weather === 'CLEAR') {
            code += `${indent}${worldVar}.setWeather(6000, 0, false, false);\n`;
          } else if (action.weather === 'RAIN') {
            code += `${indent}${worldVar}.setWeather(0, 6000, true, false);\n`;
          } else {
            code += `${indent}${worldVar}.setWeather(0, 6000, true, true);\n`;
          }
          break;
        case 'action_set_time':
          code += `${indent}${worldVar}.setTimeOfDay(${action.time});\n`;
          break;
        case 'action_announce':
          code += `${indent}for (ServerPlayerEntity p : ${playerVar}.getServer().getPlayerManager().getPlayerList()) {\n`;
          code += `${indent}    p.networkHandler.sendPacket(new net.minecraft.network.packet.s2c.play.TitleS2CPacket(Text.literal("${this._escapeJava(action.title)}")));\n`;
          code += `${indent}    p.networkHandler.sendPacket(new net.minecraft.network.packet.s2c.play.SubtitleS2CPacket(Text.literal("${this._escapeJava(action.subtitle)}")));\n`;
          if (action.sound && action.sound !== 'NONE') {
            if (this._isModern()) {
              code += `${indent}    p.playSound(SoundEvents.${action.sound}, 1.0f, 1.0f);\n`;
            } else {
              code += `${indent}    p.playSound(SoundEvents.${action.sound}, SoundCategory.MASTER, 1.0f, 1.0f);\n`;
            }
          }
          code += `${indent}}\n`;
          break;
        case 'action_scoreboard_add':
          code += `${indent}// スコアボード: ${action.objective} += ${action.value}\n`;
          code += `${indent}${playerVar}.getServer().getCommandManager().executeWithPrefix(${playerVar}.getCommandSource().withSilent(), "scoreboard players add " + ${playerVar}.getName().getString() + " ${action.objective} ${action.value}");\n`;
          break;
        case 'action_nearby_players':
          code += `${indent}for (ServerPlayerEntity nearby : ${worldVar}.getPlayers(p -> p.squaredDistanceTo(${playerVar}) <= ${action.radius * action.radius})) {\n`;
          code += this._generateActionsCode(action.doActions, indent + '    ', 'nearby', worldVar);
          code += `${indent}}\n`;
          break;
        case 'action_random_pick':
          code += `${indent}if (Math.random() < 0.5) {\n`;
          code += this._generateActionsCode(action.aActions, indent + '    ', playerVar, worldVar);
          code += `${indent}} else {\n`;
          code += this._generateActionsCode(action.bActions, indent + '    ', playerVar, worldVar);
          code += `${indent}}\n`;
          break;
        case 'action_bossbar_show':
          code += `${indent}// ボスバー表示\n`;
          code += `${indent}var bossBar = ${playerVar}.getServer().getBossBarManager().get(Identifier.of("${this.modId}", "modbar"));\n`;
          code += `${indent}if (bossBar == null) bossBar = ${playerVar}.getServer().getBossBarManager().add(Identifier.of("${this.modId}", "modbar"), Text.literal("${this._escapeJava(action.text)}"));\n`;
          code += `${indent}bossBar.setColor(net.minecraft.entity.boss.BossBar.Color.${action.color});\n`;
          code += `${indent}bossBar.setPercent(${action.progress / 100.0}f);\n`;
          code += `${indent}bossBar.addPlayer(${playerVar});\n`;
          break;
        case 'action_bossbar_hide':
          code += `${indent}var hideBar = ${playerVar}.getServer().getBossBarManager().get(Identifier.of("${this.modId}", "modbar"));\n`;
          code += `${indent}if (hideBar != null) hideBar.removePlayer(${playerVar});\n`;
          break;
        case 'action_particle_circle':
          code += `${indent}for (int angle = 0; angle < ${action.count}; angle++) {\n`;
          code += `${indent}    double rad = angle * 2 * Math.PI / ${action.count};\n`;
          code += `${indent}    ${worldVar}.spawnParticles(ParticleTypes.${action.particle}, ${playerVar}.getX() + ${action.radius} * Math.cos(rad), ${playerVar}.getY() + 0.5, ${playerVar}.getZ() + ${action.radius} * Math.sin(rad), 1, 0, 0, 0, 0);\n`;
          code += `${indent}}\n`;
          break;
        case 'action_particle_line':
          code += `${indent}for (int step = 0; step < ${action.length}; step++) {\n`;
          code += `${indent}    ${worldVar}.spawnParticles(ParticleTypes.${action.particle}, ${playerVar}.getX() + ${action.dx} * step, ${playerVar}.getY() + 1 + ${action.dy} * step, ${playerVar}.getZ() + ${action.dz} * step, 1, 0, 0, 0, 0);\n`;
          code += `${indent}}\n`;
          break;
        case 'action_firework':
          code += `${indent}// 花火打ち上げ\n`;
          code += `${indent}${playerVar}.getServer().getCommandManager().executeWithPrefix(${playerVar}.getCommandSource().withSilent(), "summon firework_rocket ~ ~ ~ {Life:0,LifeTime:${action.power * 10},FireworksItem:{id:\\"minecraft:firework_rocket\\",components:{\\"minecraft:fireworks\\":{explosions:[{shape:\\"${action.shape.toLowerCase()}\\",colors:[I;${this._fireworkColor(action.color)}]${action.twinkle ? ',has_twinkle:1b' : ''}}],flight_duration:${action.power}b}}}}");\n`;
          break;
        case 'action_lightning':
          code += `${indent}net.minecraft.entity.LightningEntity lightning = net.minecraft.entity.EntityType.LIGHTNING_BOLT.create(${worldVar});\n`;
          code += `${indent}lightning.setPosition(${playerVar}.getX() + ${action.x}, ${playerVar}.getY(), ${playerVar}.getZ() + ${action.z});\n`;
          if (!action.damage) code += `${indent}lightning.setCosmetic(true);\n`;
          code += `${indent}${worldVar}.spawnEntity(lightning);\n`;
          break;
        case 'action_launch':
          code += `${indent}${playerVar}.setVelocity(${playerVar}.getVelocity().add(${action.x}, ${action.y}, ${action.z}));\n`;
          code += `${indent}${playerVar}.velocityModified = true;\n`;
          break;
        case 'action_set_velocity':
          code += `${indent}${playerVar}.setVelocity(${action.x}, ${action.y}, ${action.z});\n`;
          code += `${indent}${playerVar}.velocityModified = true;\n`;
          break;
        case 'action_set_fire':
          code += `${indent}${playerVar}.setOnFireFor(${action.seconds});\n`;
          break;
        case 'action_extinguish':
          code += `${indent}${playerVar}.extinguish();\n`;
          break;
        case 'action_freeze':
          code += `${indent}${playerVar}.setFrozenTicks(${action.ticks});\n`;
          break;
        case 'action_clear_inventory':
          code += `${indent}${playerVar}.getInventory().clear();\n`;
          break;
        case 'action_set_slot':
          const slotMap = { MAINHAND: 'getMainHandStack', OFFHAND: 'getOffHandStack' };
          code += `${indent}${playerVar}.equipStack(net.minecraft.entity.EquipmentSlot.${action.slot}, new ItemStack(Registries.ITEM.get(Identifier.of("${this._resolveItemId(action.item)}")), ${action.count}));\n`;
          break;
        case 'action_consume_item':
          code += `${indent}// アイテム消費: ${action.item} x${action.count}\n`;
          code += `${indent}for (int slot = 0; slot < ${playerVar}.getInventory().size(); slot++) {\n`;
          code += `${indent}    ItemStack invStack = ${playerVar}.getInventory().getStack(slot);\n`;
          code += `${indent}    if (invStack.getItem() == Registries.ITEM.get(Identifier.of("${this._resolveItemId(action.item)}"))) {\n`;
          code += `${indent}        invStack.decrement(Math.min(${action.count}, invStack.getCount()));\n`;
          code += `${indent}        break;\n`;
          code += `${indent}    }\n`;
          code += `${indent}}\n`;
          break;
        case 'action_fill_blocks':
          code += `${indent}for (int fx = ${action.x1}; fx <= ${action.x2}; fx++)\n`;
          code += `${indent}    for (int fy = ${action.y1}; fy <= ${action.y2}; fy++)\n`;
          code += `${indent}        for (int fz = ${action.z1}; fz <= ${action.z2}; fz++)\n`;
          code += `${indent}            ${worldVar}.setBlockState(${playerVar}.getBlockPos().add(fx, fy, fz), Registries.BLOCK.get(Identifier.of("${this._resolveItemId(action.block)}")).getDefaultState());\n`;
          break;
        case 'action_damage_player':
          code += `${indent}${playerVar}.damage(${worldVar}.getDamageSources().generic(), ${action.amount}f);\n`;
          break;
        case 'action_set_saturation':
          code += `${indent}${playerVar}.getHungerManager().setFoodLevel(${action.food});\n`;
          code += `${indent}${playerVar}.getHungerManager().setSaturationLevel(${action.sat}f);\n`;
          break;
        case 'action_tablist':
          code += `${indent}${playerVar}.networkHandler.sendPacket(new net.minecraft.network.packet.s2c.play.PlayerListHeaderS2CPacket(Text.literal("${this._escapeJava(action.header)}"), Text.literal("${this._escapeJava(action.footer)}")));\n`;
          break;
        case 'action_no_fall_damage':
          code += `${indent}${playerVar}.addStatusEffect(new StatusEffectInstance(StatusEffects.SLOW_FALLING, ${action.seconds * 20}, 0, false, false));\n`;
          break;
        case 'action_for_all_players':
          code += `${indent}for (ServerPlayerEntity allP : ${playerVar}.getServer().getPlayerManager().getPlayerList()) {\n`;
          code += this._generateActionsCode(action.doActions, indent + '    ', 'allP', worldVar);
          code += `${indent}}\n`;
          break;
        case 'action_spawn_armor_stand':
          code += `${indent}{\n`;
          code += `${indent}    var stand = new net.minecraft.entity.decoration.ArmorStandEntity(${worldVar}, ${playerVar}.getX()+${action.x}, ${playerVar}.getY()+${action.y}, ${playerVar}.getZ()+${action.z});\n`;
          if (action.name) code += `${indent}    stand.setCustomName(Text.literal("${this._escapeJava(action.name)}"));\n`;
          if (action.name) code += `${indent}    stand.setCustomNameVisible(true);\n`;
          if (action.invisible) code += `${indent}    stand.setInvisible(true);\n`;
          code += `${indent}    ${worldVar}.spawnEntity(stand);\n`;
          code += `${indent}}\n`;
          break;
        case 'action_modify_attribute':
          code += `${indent}// 属性変更(一時的)\n`;
          code += `${indent}${playerVar}.getAttributeInstance(net.minecraft.entity.attribute.EntityAttributes.${action.attribute}).addTemporaryModifier(\n`;
          code += `${indent}    new net.minecraft.entity.attribute.EntityAttributeModifier(Identifier.of("${this.modId}","mod_attr"), ${action.value}, net.minecraft.entity.attribute.EntityAttributeModifier.Operation.ADD_VALUE));\n`;
          break;
        case 'action_schedule':
          code += `${indent}// スケジュール実行: ${action.interval}tick毎 x${action.times}回\n`;
          code += `${indent}// 注意: 簡易実装（本格的にはScheduledExecutorServiceを使用）\n`;
          break;
        case 'action_send_actionbar_dynamic':
          code += `${indent}${playerVar}.sendMessage(Text.literal(String.valueOf(${this._generateValueExpr(action.textExpr, playerVar, worldVar)})), true);\n`;
          break;
        case 'action_send_title_dynamic':
          code += `${indent}${playerVar}.networkHandler.sendPacket(new net.minecraft.network.packet.s2c.play.TitleS2CPacket(Text.literal(String.valueOf(${this._generateValueExpr(action.titleExpr, playerVar, worldVar)}))));\n`;
          code += `${indent}${playerVar}.networkHandler.sendPacket(new net.minecraft.network.packet.s2c.play.SubtitleS2CPacket(Text.literal(String.valueOf(${this._generateValueExpr(action.subtitleExpr, playerVar, worldVar)}))));\n`;
          break;
      }
    }
    return code;
  }

  // 値式をJavaコードに変換
  _generateValueExpr(expr, playerVar, worldVar) {
    if (!expr) return '""';
    switch (expr.type) {
      // プレイヤー情報
      case 'get_player_name':
      case 'player_name':
        return `${playerVar}.getName().getString()`;
      case 'get_player_health':
        return `${playerVar}.getHealth()`;
      case 'get_player_max_health':
        return `${playerVar}.getMaxHealth()`;
      case 'get_player_hunger':
        return `${playerVar}.getHungerManager().getFoodLevel()`;
      case 'get_player_level':
        return `${playerVar}.experienceLevel`;
      case 'get_player_xp':
        return `${playerVar}.totalExperience`;
      case 'get_player_pos':
        const axisMethod = { X: 'getX', Y: 'getY', Z: 'getZ' };
        return `${playerVar}.${axisMethod[expr.axis]}()`;
      case 'get_player_gamemode':
        return `${playerVar}.interactionManager.getGameMode().getName()`;
      // アイテム情報
      case 'get_held_item_name':
        return `${playerVar}.getMainHandStack().getName().getString()`;
      case 'get_held_item_id':
        return `Registries.ITEM.getId(${playerVar}.getMainHandStack().getItem()).toString()`;
      case 'get_held_item_count':
        return `${playerVar}.getMainHandStack().getCount()`;
      case 'get_held_item_durability':
        return `(${playerVar}.getMainHandStack().getMaxDamage() - ${playerVar}.getMainHandStack().getDamage())`;
      case 'get_offhand_item_name':
        return `${playerVar}.getOffHandStack().getName().getString()`;
      // ワールド情報
      case 'get_world_time':
        return `(int)(${worldVar}.getTimeOfDay() % 24000L)`;
      case 'get_day_count':
        return `(int)(${worldVar}.getTimeOfDay() / 24000L)`;
      case 'get_weather':
        return `(${worldVar}.isThundering() ? "thunder" : ${worldVar}.isRaining() ? "rain" : "clear")`;
      case 'get_biome':
        return `${worldVar}.getBiome(${playerVar}.getBlockPos()).getKey().map(k -> k.getValue().toString()).orElse("unknown")`;
      case 'get_dimension_name':
        return `${worldVar}.getRegistryKey().getValue().getPath()`;
      case 'get_light_level':
        return `${worldVar}.getLightLevel(${playerVar}.getBlockPos())`;
      case 'get_block_at_pos':
        return `Registries.BLOCK.getId(${worldVar}.getBlockState(new BlockPos((int)(${this._generateValueExpr(expr.x, playerVar, worldVar)}), (int)(${this._generateValueExpr(expr.y, playerVar, worldVar)}), (int)(${this._generateValueExpr(expr.z, playerVar, worldVar)}))).getBlock()).toString()`;
      case 'get_online_count':
        return `${playerVar}.getServer().getCurrentPlayerCount()`;
      case 'get_server_tps':
        return `Math.min(20.0, 1000.0 / Math.max(1, ${playerVar}.getServer().getAverageTickTime()))`;
      case 'get_kill_count':
        return `${playerVar}.getStatHandler().getStat(net.minecraft.stat.Stats.CUSTOM.getOrCreateStat(net.minecraft.stat.Stats.PLAYER_KILLS))`;
      case 'get_entity_count':
        return `${worldVar}.getEntitiesByClass(net.minecraft.entity.Entity.class, ${playerVar}.getBoundingBox().expand(32), e -> true).size()`;
      case 'get_chat_message':
        return `"" /* chat message from event context */`;
      // 値
      case 'text_value':
        return `"${this._escapeJava(expr.text)}"`;
      case 'number_value':
        return `${expr.num}`;
      case 'mc_text_join':
        return `(String.valueOf(${this._generateValueExpr(expr.a, playerVar, worldVar)}) + String.valueOf(${this._generateValueExpr(expr.b, playerVar, worldVar)}))`;
      case 'number_to_text':
        return `String.valueOf(${this._generateValueExpr(expr.inner, playerVar, worldVar)})`;
      case 'math_operation':
        return `(${this._generateValueExpr(expr.a, playerVar, worldVar)} ${expr.op} ${this._generateValueExpr(expr.b, playerVar, worldVar)})`;
      case 'math_random':
        return `(${expr.min} + (int)(Math.random() * ${expr.max - expr.min + 1}))`;
      case 'var_get_number':
        return `ModVars.getInt("${expr.varName}")`;
      case 'var_get_string':
        return `ModVars.getString("${expr.varName}")`;
      case 'var_get_bool':
        return `ModVars.getBool("${expr.varName}")`;
      case 'literal_string':
        return `"${this._escapeJava(expr.value || '')}"`;
      default:
        return '""';
    }
  }

  _generateConditionCode(cond, playerVar, worldVar) {
    switch (cond.type) {
      case 'check_sneaking':
        return `${playerVar}.isSneaking()`;
      case 'check_holding_item':
        return `${playerVar}.getMainHandStack().getItem() == Registries.ITEM.get(Identifier.of("${this._resolveItemId(cond.item)}"))`;
      case 'check_dimension':
        const dimMap = { OVERWORLD: 'OVERWORLD', THE_NETHER: 'THE_NETHER', THE_END: 'THE_END' };
        return `${playerVar}.getWorld().getRegistryKey() == World.${dimMap[cond.dimension]}`;
      case 'check_time':
        const timeMap = {
          DAY: `${worldVar}.getTimeOfDay() % 24000 < 12000`,
          NIGHT: `${worldVar}.getTimeOfDay() % 24000 >= 12000`,
          SUNRISE: `${worldVar}.getTimeOfDay() % 24000 < 2000`,
          SUNSET: `${worldVar}.getTimeOfDay() % 24000 >= 10000 && ${worldVar}.getTimeOfDay() % 24000 < 14000`
        };
        return timeMap[cond.time] || 'true';
      case 'check_health':
        return `${playerVar}.getHealth() ${cond.op} ${cond.value}f`;
      case 'logic_and':
        return `(${this._generateConditionCode(cond.a, playerVar, worldVar)} && ${this._generateConditionCode(cond.b, playerVar, worldVar)})`;
      case 'logic_or':
        return `(${this._generateConditionCode(cond.a, playerVar, worldVar)} || ${this._generateConditionCode(cond.b, playerVar, worldVar)})`;
      case 'logic_not':
        return `!(${this._generateConditionCode(cond.inner, playerVar, worldVar)})`;
      case 'random_chance':
        return `Math.random() < ${cond.chance / 100.0}`;
      case 'var_compare':
        return `ModVars.getInt("${cond.varName}") ${cond.op} ${cond.value}`;
      case 'var_string_equals':
        return `ModVars.getString("${cond.varName}").equals("${this._escapeJava(cond.value)}")`;
      case 'var_get_bool':
        return `ModVars.getBool("${cond.varName}")`;
      case 'check_in_area':
        return `(${playerVar}.getX() >= ${cond.x1} && ${playerVar}.getX() <= ${cond.x2} && ${playerVar}.getY() >= ${cond.y1} && ${playerVar}.getY() <= ${cond.y2} && ${playerVar}.getZ() >= ${cond.z1} && ${playerVar}.getZ() <= ${cond.z2})`;
      case 'check_biome':
        return `${worldVar}.getBiome(${playerVar}.getBlockPos()).matchesKey(net.minecraft.registry.RegistryKey.of(net.minecraft.registry.RegistryKeys.BIOME, Identifier.of("minecraft", "${cond.biome}")))`;
      case 'check_weather':
        if (cond.weather === 'CLEAR') return `(!${worldVar}.isRaining())`;
        if (cond.weather === 'RAIN') return `(${worldVar}.isRaining() && !${worldVar}.isThundering())`;
        return `(${worldVar}.isThundering())`;
      case 'check_has_permission':
        return `${playerVar}.hasPermissionLevel(${cond.level})`;
      case 'check_on_ground':
        return `${playerVar}.isOnGround()`;
      case 'check_in_water':
        return `${playerVar}.isTouchingWater()`;
      case 'check_in_lava':
        return `${playerVar}.isInLava()`;
      case 'check_is_flying':
        return `${playerVar}.getAbilities().flying`;
      case 'check_is_sprinting':
        return `${playerVar}.isSprinting()`;
      case 'check_is_swimming':
        return `${playerVar}.isSwimming()`;
      case 'check_has_effect':
        return `${playerVar}.hasStatusEffect(StatusEffects.${cond.effect})`;
      case 'check_item_count':
        return `${playerVar}.getInventory().count(Registries.ITEM.get(Identifier.of("${this._resolveItemId(cond.item)}"))) >= ${cond.count}`;
      case 'check_armor_wearing':
        return `${playerVar}.getEquippedStack(net.minecraft.entity.EquipmentSlot.${cond.slot}).getItem() == Registries.ITEM.get(Identifier.of("${this._resolveItemId(cond.item)}"))`;
      default:
        return 'true';
    }
  }

  _generateModVarsClass(pkg) {
    if (this.variables.size === 0) return '';
    let code = `package ${pkg};\n\n`;
    code += `import java.util.HashMap;\n`;
    code += `import java.util.Map;\n\n`;
    code += `/**\n * グローバル変数ストレージ (FabricMod Visual Builder 自動生成)\n */\n`;
    code += `public class ModVars {\n`;
    code += `    private static final Map<String, Object> VARS = new HashMap<>();\n\n`;
    code += `    public static void setInt(String key, int value) { VARS.put(key, value); }\n`;
    code += `    public static int getInt(String key) { return (int) VARS.getOrDefault(key, 0); }\n`;
    code += `    public static void addInt(String key, int value) { VARS.put(key, getInt(key) + value); }\n`;
    code += `    public static void setString(String key, String value) { VARS.put(key, value); }\n`;
    code += `    public static String getString(String key) { return (String) VARS.getOrDefault(key, ""); }\n`;
    code += `    public static void setBool(String key, boolean value) { VARS.put(key, value); }\n`;
    code += `    public static boolean getBool(String key) { return (boolean) VARS.getOrDefault(key, false); }\n`;
    code += `}\n`;
    return code;
  }

  _generateWorldGenClass(pkg) {
    if (this.oreGens.length === 0) return '// 鉱石ワールド生成ブロックを追加するとコードが生成されます';

    let code = `package ${pkg};\n\n`;
    code += `import net.fabricmc.fabric.api.biome.v1.BiomeModifications;\n`;
    code += `import net.fabricmc.fabric.api.biome.v1.BiomeSelectors;\n`;
    code += `import net.minecraft.registry.Registries;\n`;
    code += `import net.minecraft.registry.Registry;\n`;
    code += `import net.minecraft.registry.RegistryKey;\n`;
    code += `import net.minecraft.registry.RegistryKeys;\n`;
    code += `import net.minecraft.util.Identifier;\n`;
    code += `import net.minecraft.world.gen.GenerationStep;\n`;
    code += `import net.minecraft.world.gen.YOffset;\n`;
    code += `import net.minecraft.world.gen.feature.*;\n`;
    code += `import net.minecraft.world.gen.placementmodifier.*;\n`;
    code += `import net.minecraft.structure.rule.BlockMatchRuleTest;\n`;
    code += `import net.minecraft.block.Blocks;\n`;
    code += `import java.util.List;\n\n`;
    code += `public class ModWorldGen {\n\n`;
    code += `    public static void registerOreGen() {\n`;

    for (let i = 0; i < this.oreGens.length; i++) {
      const og = this.oreGens[i];
      code += `\n        // 鉱石生成: ${og.blockId}\n`;
      code += `        // 注意: 完全なワールド生成にはデータパックまたはConfiguredFeature/PlacedFeatureの\n`;
      code += `        // JSON登録が推奨されます。以下はFabric APIを使った簡易実装です。\n`;
      code += `        BiomeModifications.addFeature(\n`;
      const selectorMap = { OVERWORLD: 'foundInOverworld()', NETHER: 'foundInTheNether()', END: 'foundInTheEnd()' };
      code += `            BiomeSelectors.${selectorMap[og.dimension]},\n`;
      code += `            GenerationStep.Feature.UNDERGROUND_ORES,\n`;
      code += `            RegistryKey.of(RegistryKeys.PLACED_FEATURE, Identifier.of("${this.modId}", "${og.blockId}_ore_placed"))\n`;
      code += `        );\n`;
    }

    code += `    }\n`;
    code += `}\n`;
    return code;
  }

  _generateCommandsClass(pkg) {
    if (this.commands.length === 0) return '// コマンドブロックを追加するとコードが生成されます';

    let code = `package ${pkg};\n\n`;
    code += `import com.mojang.brigadier.arguments.IntegerArgumentType;\n`;
    code += `import com.mojang.brigadier.arguments.FloatArgumentType;\n`;
    code += `import com.mojang.brigadier.arguments.StringArgumentType;\n`;
    code += `import net.fabricmc.fabric.api.command.v2.CommandRegistrationCallback;\n`;
    code += `import net.minecraft.command.argument.EntityArgumentType;\n`;
    code += `import net.minecraft.entity.effect.StatusEffectInstance;\n`;
    code += `import net.minecraft.entity.effect.StatusEffects;\n`;
    code += `import net.minecraft.item.ItemStack;\n`;
    code += `import net.minecraft.particle.ParticleTypes;\n`;
    code += `import net.minecraft.registry.Registries;\n`;
    code += `import net.minecraft.server.command.CommandManager;\n`;
    code += `import net.minecraft.server.command.ServerCommandSource;\n`;
    code += `import net.minecraft.server.network.ServerPlayerEntity;\n`;
    code += `import net.minecraft.server.world.ServerWorld;\n`;
    if (!this._isModern()) code += `import net.minecraft.sound.SoundCategory;\n`;
    code += `import net.minecraft.sound.SoundEvents;\n`;
    code += `import net.minecraft.text.Text;\n`;
    code += `import net.minecraft.util.Formatting;\n`;
    code += `import net.minecraft.util.Identifier;\n`;
    code += `import net.minecraft.world.GameMode;\n`;
    code += `import net.minecraft.world.World;\n\n`;
    code += `public class ModCommands {\n\n`;
    code += `    public static void registerCommands() {\n`;
    code += `        CommandRegistrationCallback.EVENT.register((dispatcher, registryAccess, environment) -> {\n`;

    for (const cmd of this.commands) {
      if (cmd.type === 'simple') {
        code += `\n            // /${cmd.name}\n`;
        code += `            dispatcher.register(CommandManager.literal("${cmd.name}")\n`;
        code += `                .requires(source -> source.hasPermissionLevel(${cmd.permission}))\n`;
        code += `                .executes(context -> {\n`;
        code += `                    ServerPlayerEntity serverPlayer = context.getSource().getPlayerOrThrow();\n`;
        code += `                    ServerWorld world = serverPlayer.getServerWorld();\n`;
        code += this._generateActionsCode(cmd.actions, '                    ', 'serverPlayer', 'world');
        code += `                    return 1;\n`;
        code += `                })\n`;
        code += `            );\n`;
      } else if (cmd.type === 'with_arg') {
        const argTypeMap = {
          integer: 'IntegerArgumentType.integer()',
          float: 'FloatArgumentType.floatArg()',
          string: 'StringArgumentType.string()',
          player: 'EntityArgumentType.player()'
        };
        code += `\n            // /${cmd.name} <${cmd.argName}>\n`;
        code += `            dispatcher.register(CommandManager.literal("${cmd.name}")\n`;
        code += `                .requires(source -> source.hasPermissionLevel(${cmd.permission}))\n`;
        code += `                .then(CommandManager.argument("${cmd.argName}", ${argTypeMap[cmd.argType]})\n`;
        code += `                    .executes(context -> {\n`;
        code += `                        ServerPlayerEntity serverPlayer = context.getSource().getPlayerOrThrow();\n`;
        code += `                        ServerWorld world = serverPlayer.getServerWorld();\n`;
        code += this._generateActionsCode(cmd.actions, '                        ', 'serverPlayer', 'world');
        code += `                        return 1;\n`;
        code += `                    })\n`;
        code += `                )\n`;
        code += `            );\n`;
      }
    }

    code += `        });\n`;
    code += `    }\n`;
    code += `}\n`;
    return code;
  }

  _generateRecipes() {
    const recipes = {};
    const modernRecipeFormat = this._usesModernRecipeFormat();
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      const resultKey = recipe.result || recipe.output || recipe.addition || 'recipe';
      const resultId = this._resolveItemId(resultKey);
      const fileName = `${resultKey.replace(/:/g, '_')}_${i}.json`;

      switch (recipe.type) {
        case 'shaped': {
          const json = {
            type: 'minecraft:crafting_shaped',
            pattern: recipe.pattern,
            key: {},
            result: modernRecipeFormat
              ? { id: resultId, count: recipe.count }
              : { item: resultId, count: recipe.count }
          };
          for (const [key, item] of Object.entries(recipe.keys)) {
            json.key[key] = { item: this._resolveItemId(item) };
          }
          recipes[fileName] = JSON.stringify(json, null, 2);
          break;
        }
        case 'shapeless': {
          const json = {
            type: 'minecraft:crafting_shapeless',
            ingredients: recipe.ingredients.map(item => ({ item: this._resolveItemId(item) })),
            result: modernRecipeFormat
              ? { id: resultId, count: recipe.count }
              : { item: resultId, count: recipe.count }
          };
          recipes[fileName] = JSON.stringify(json, null, 2);
          break;
        }
        case 'smelting': {
          const json = {
            type: `minecraft:${recipe.smeltType}`,
            ingredient: { item: this._resolveItemId(recipe.input) },
            result: modernRecipeFormat ? { id: this._resolveItemId(recipe.output) } : this._resolveItemId(recipe.output),
            experience: recipe.xp,
            cookingtime: recipe.cookingTime
          };
          recipes[fileName] = JSON.stringify(json, null, 2);
          break;
        }
        case 'smithing': {
          const json = {
            type: 'minecraft:smithing_transform',
            template: { item: 'minecraft:netherite_upgrade_smithing_template' },
            base: { item: this._resolveItemId(recipe.base) },
            addition: { item: this._resolveItemId(recipe.addition) },
            result: modernRecipeFormat
              ? { id: this._resolveItemId(recipe.result) }
              : { item: this._resolveItemId(recipe.result) }
          };
          recipes[fileName] = JSON.stringify(json, null, 2);
          break;
        }
        case 'stonecutting': {
          const json = {
            type: 'minecraft:stonecutting',
            ingredient: { item: this._resolveItemId(recipe.input) },
            result: modernRecipeFormat
              ? { id: this._resolveItemId(recipe.output), count: recipe.count }
              : this._resolveItemId(recipe.output),
            ...(modernRecipeFormat ? {} : { count: recipe.count })
          };
          recipes[fileName] = JSON.stringify(json, null, 2);
          break;
        }
      }
    }
    return recipes;
  }

  _generateFabricModJson(pkg, className) {
    let mcDep;
    let javaDep;
    if (this._isNewNumbering()) {
      mcDep = `~${this.mcVersion.split('.')[0]}.${this.mcVersion.split('.')[1]}`;
      javaDep = '>=25';
    } else {
      const mcMajor = this.mcVersion.split('.').slice(0, 2).join('.');
      mcDep = `~${mcMajor}`;
      javaDep = mcMajor === '1.20' ? '>=17' : '>=21';
    }
    const environmentMap = {
      BOTH: '*',
      CLIENT: 'client',
      SERVER: 'server'
    };
    const json = {
      schemaVersion: 1,
      id: this.modId,
      version: this.version,
      name: this.modName,
      description: `A mod created with FabricMod Visual Builder`,
      authors: ["ModBuilder User"],
      contact: {},
      license: "MIT",
      environment: environmentMap[this.modSide] || '*',
      entrypoints: {
        main: [`${pkg}.${className}Mod`]
      },
      depends: {
        fabricloader: ">=0.16.0",
        minecraft: mcDep,
        java: javaDep,
        "fabric-api": "*"
      },
      custom: {
        modmenu: {
          update_checker: false
        }
      }
    };
    return JSON.stringify(json, null, 2);
  }

  _resolveItemId(id) {
    if (!id) return 'minecraft:air';
    if (id.includes(':')) return id;
    // Check if it's a custom item/block from this mod
    const isCustom = this.items.some(i => i.id === id) || this.blocks.some(b => b.id === id);
    return isCustom ? `${this.modId}:${id}` : `minecraft:${id}`;
  }

  _toClassName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '').replace(/^./, c => c.toUpperCase());
  }

  _fireworkColor(color) {
    const map = { RED: '11743532', BLUE: '2437522', GREEN: '3887386', YELLOW: '14602026',
      PURPLE: '8073150', WHITE: '15790320', ORANGE: '15435844', CYAN: '2651799' };
    return map[color] || '15790320';
  }

  // バージョン判定ヘルパー
  _isNewNumbering() {
    // 26.x = new numbering (2026~)
    const parts = (this.mcVersion || '1.21.4').split('.').map(Number);
    return parts[0] >= 26;
  }

  _isModern() {
    // 1.21以上 or 26.x = modern API (no SoundCategory, ToolMaterial, FoodComponent record)
    if (this._isNewNumbering()) return true;
    const parts = (this.mcVersion || '1.21.4').split('.').map(Number);
    return parts[0] > 1 || (parts[0] === 1 && parts[1] >= 21);
  }

  _isUnobfuscated() {
    // 26.x = no yarn mappings, mojang mappings, no remap
    return this._isNewNumbering();
  }

  _usesModernRecipeFormat() {
    return this._isNewNumbering();
  }

  _escapeJava(str) {
    return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  }

  // ===== リソースファイル生成 =====
  _generateResources() {
    const res = {};
    const modId = this.modId;
    const writeClientItem = (id, modelPath) => {
      res[`assets/${modId}/items/${id}.json`] = JSON.stringify({
        model: {
          type: 'minecraft:model',
          model: modelPath
        }
      }, null, 2);
    };

    // ── en_us.json (言語ファイル) ──
    const lang = {};
    for (const item of this.items) {
      lang[`item.${modId}.${item.id}`] = item.name;
    }
    // 防具セットの言語ファイル
    const armorParts = { helmet: 'Helmet', chestplate: 'Chestplate', leggings: 'Leggings', boots: 'Boots' };
    const armorPartsJa = { helmet: 'ヘルメット', chestplate: 'チェストプレート', leggings: 'レギンス', boots: 'ブーツ' };
    for (const armor of this.armorSets) {
      for (const [part, enName] of Object.entries(armorParts)) {
        lang[`item.${modId}.${armor.idPrefix}_${part}`] = `${armor.namePrefix} ${enName}`;
      }
    }
    for (const blk of this.blocks) {
      lang[`block.${modId}.${blk.id}`] = blk.name;
    }
    for (const enchantment of this.enchantments) {
      lang[`enchantment.${modId}.${enchantment.id}`] = enchantment.name;
    }
    for (const effect of this.statusEffects) {
      lang[`effect.${modId}.${effect.id}`] = effect.name;
    }
    lang[`modmenu.nameTranslation.${modId}`] = this.modName;
    lang[`modmenu.summaryTranslation.${modId}`] = `Generated with FabricMod Visual Builder`;
    lang[`modmenu.descriptionTranslation.${modId}`] = `${this.modName} for Minecraft ${this.mcVersion}`;
    // クリエイティブタブ
    for (const tab of this.creativeTabs) {
      lang[`itemGroup.${modId}.${tab.tabId}`] = tab.tabName;
    }
    if (Object.keys(lang).length > 0) {
      res[`assets/${modId}/lang/en_us.json`] = JSON.stringify(lang, null, 2);
      // 日本語も同じ名前で生成(ユーザーが後で編集可)
      res[`assets/${modId}/lang/ja_jp.json`] = JSON.stringify(lang, null, 2);
    }

    // ── アイテムモデル JSON ──
    for (const item of this.items) {
      const model = {
        parent: "minecraft:item/generated",
        textures: {
          layer0: `${modId}:item/${item.id}`
        }
      };
      if (item.type === 'tool') {
        model.parent = "minecraft:item/handheld";
      }
      res[`assets/${modId}/models/item/${item.id}.json`] = JSON.stringify(model, null, 2);
      writeClientItem(item.id, `${modId}:item/${item.id}`);
    }

    // ── ブロックモデル・ブロックステート・ブロックアイテムモデル ──
    for (const blk of this.blocks) {
      // Blockstate
      const blockstate = {
        variants: {
          "": { model: `${modId}:block/${blk.id}` }
        }
      };
      res[`assets/${modId}/blockstates/${blk.id}.json`] = JSON.stringify(blockstate, null, 2);

      // Block model
      const blockModel = {
        parent: "minecraft:block/cube_all",
        textures: {
          all: `${modId}:block/${blk.id}`
        }
      };
      res[`assets/${modId}/models/block/${blk.id}.json`] = JSON.stringify(blockModel, null, 2);

      // Block item model (ブロックをアイテムとして持つ時)
      if (blk.hasItem) {
        const itemModel = {
          parent: `${modId}:block/${blk.id}`
        };
        res[`assets/${modId}/models/item/${blk.id}.json`] = JSON.stringify(itemModel, null, 2);
        writeClientItem(blk.id, `${modId}:block/${blk.id}`);
      }
    }

    // ── テクスチャ用プレースホルダー (READMEのみ) ──
    if (this.items.length > 0 || this.blocks.length > 0) {
      let readme = `# テクスチャ配置ガイド\n\n`;
      readme += `テクスチャファイル (16x16 PNG) を以下のパスに配置してください:\n\n`;
      for (const item of this.items) {
        readme += `- assets/${modId}/textures/item/${item.id}.png  (${item.name})\n`;
      }
      for (const blk of this.blocks) {
        readme += `- assets/${modId}/textures/block/${blk.id}.png  (${blk.name})\n`;
      }
      readme += `\nテクスチャが無い場合、紫黒のチェッカー模様（Missing Texture）で表示されます。\n`;
      // 防具テクスチャのガイド追加
      for (const armor of this.armorSets) {
        for (const part of Object.keys(armorParts)) {
          readme += `- assets/${modId}/textures/item/${armor.idPrefix}_${part}.png  (${armor.namePrefix} ${armorParts[part]})\n`;
        }
        readme += `- assets/${modId}/textures/models/armor/${armor.idPrefix}_layer_1.png  (防具テクスチャ上半身)\n`;
        readme += `- assets/${modId}/textures/models/armor/${armor.idPrefix}_layer_2.png  (防具テクスチャ下半身)\n`;
      }
      readme += `\nテクスチャが無い場合、紫黒のチェッカー模様（Missing Texture）で表示されます。\n`;
      res[`assets/${modId}/textures/TEXTURE_README.md`] = readme;
    }

    if (this.enchantments.length > 0) {
      const enchantmentGuide = [];
      enchantmentGuide.push('# Enchantment Notes');
      enchantmentGuide.push('');
      enchantmentGuide.push('This project includes enchantment definitions created in FabricMod Visual Builder.');
      enchantmentGuide.push('');
      if (this._isModern()) {
        enchantmentGuide.push('Minecraft 1.21+ uses the data-driven enchantment system.');
        enchantmentGuide.push('Add or refine the JSON files in data/<modid>/enchantments/ if you want custom effects.');
      } else {
        enchantmentGuide.push('Minecraft 1.20.x uses the older enchantment API.');
        enchantmentGuide.push('The builder currently exports metadata and localization, but custom runtime enchantment code should be added manually for full behavior.');
      }
      enchantmentGuide.push('');
      enchantmentGuide.push('Defined enchantments:');
      for (const enchantment of this.enchantments) {
        enchantmentGuide.push(`- ${enchantment.id} (${enchantment.name}) target=${enchantment.target} maxLevel=${enchantment.maxLevel}`);
      }
      res[`data/${modId}/enchantments/ENCHANTMENTS_README.md`] = enchantmentGuide.join('\n');
      if (!this.mcVersion.startsWith('1.20')) {
        for (const enchantment of this.enchantments) {
          const targetMap = {
            WEAPON: { supported_items: '#minecraft:enchantable/weapon', slots: ['hand'] },
            DIGGER: { supported_items: '#minecraft:enchantable/mining', slots: ['hand'] },
            ARMOR: { supported_items: '#minecraft:enchantable/armor', slots: ['head', 'chest', 'legs', 'feet'] },
            ARMOR_HEAD: { supported_items: '#minecraft:enchantable/head_armor', slots: ['head'] },
            ARMOR_CHEST: { supported_items: '#minecraft:enchantable/chest_armor', slots: ['chest'] },
            ARMOR_LEGS: { supported_items: '#minecraft:enchantable/leg_armor', slots: ['legs'] },
            ARMOR_FEET: { supported_items: '#minecraft:enchantable/foot_armor', slots: ['feet'] },
            BOW: { supported_items: 'minecraft:bow', slots: ['hand'] },
            CROSSBOW: { supported_items: 'minecraft:crossbow', slots: ['hand'] },
            FISHING_ROD: { supported_items: 'minecraft:fishing_rod', slots: ['hand'] },
            TRIDENT: { supported_items: 'minecraft:trident', slots: ['hand'] }
          };
          const target = targetMap[enchantment.target] || targetMap.WEAPON;
          const weightMap = { COMMON: 10, UNCOMMON: 5, RARE: 2, VERY_RARE: 1 };
          const json = {
            anvil_cost: Math.max(1, enchantment.maxLevel + 2),
            description: { translate: `enchantment.${modId}.${enchantment.id}` },
            max_cost: { base: 8, per_level_above_first: 10 },
            max_level: enchantment.maxLevel,
            min_cost: { base: 1, per_level_above_first: 8 },
            slots: target.slots,
            supported_items: target.supported_items,
            weight: weightMap[enchantment.rarity] || 10
          };
          res[`data/${modId}/enchantments/${enchantment.id}.json`] = JSON.stringify(json, null, 2);
        }
      }
    }

    if (this.customSounds.length > 0) {
      const soundsJson = {};
      for (const sound of this.customSounds) {
        soundsJson[`${modId}.${sound.id}`] = {
          category: 'master',
          sounds: [{ name: `${modId}:${sound.file}`, stream: false }]
        };
      }
      res[`assets/${modId}/sounds.json`] = JSON.stringify(soundsJson, null, 2);
      const soundGuide = [
        '# Custom Sounds',
        '',
        'Place your sound files in these paths:'
      ];
      for (const sound of this.customSounds) {
        soundGuide.push(`- assets/${modId}/sounds/${sound.file}.ogg`);
      }
      res[`assets/${modId}/sounds/SOUNDS_README.md`] = soundGuide.join('\n');
    }

    if (this.paintings.length > 0 || this.bannerPatterns.length > 0 || this.fluids.length > 0 || this.dimensions.length > 0 || this.statusEffects.length > 0 || this.throwables.length > 0) {
      const notes = ['# Additional Content Notes', ''];
      if (this.statusEffects.length > 0) {
        notes.push('Status effects:');
        for (const effect of this.statusEffects) {
          notes.push(`- ${effect.id} (${effect.name}) color=${effect.color} beneficial=${effect.beneficial}`);
        }
        notes.push('');
      }
      if (this.throwables.length > 0) {
        notes.push('Throwable items:');
        for (const item of this.throwables) {
          notes.push(`- ${item.id} (${item.name}) damage=${item.damage}`);
        }
        notes.push('');
      }
      if (this.paintings.length > 0) {
        notes.push('Paintings:');
        for (const painting of this.paintings) {
          notes.push(`- ${painting.id} (${painting.name}) ${painting.width}x${painting.height}`);
        }
        notes.push('');
      }
      if (this.bannerPatterns.length > 0) {
        notes.push('Banner patterns:');
        for (const pattern of this.bannerPatterns) {
          notes.push(`- ${pattern.id} (${pattern.name})`);
        }
        notes.push('');
      }
      if (this.fluids.length > 0) {
        notes.push('Fluids:');
        for (const fluid of this.fluids) {
          notes.push(`- ${fluid.id} (${fluid.name}) luminance=${fluid.luminance}`);
        }
        notes.push('');
      }
      if (this.dimensions.length > 0) {
        notes.push('Dimensions:');
        for (const dimension of this.dimensions) {
          notes.push(`- ${dimension.id} (${dimension.name}) skyColor=${dimension.skyColor}`);
        }
        notes.push('');
      }
      notes.push('These entries are exported as metadata notes. Add runtime Java logic if you need full custom behavior.');
      res[`assets/${modId}/modbuilder/ADDITIONAL_CONTENT_README.md`] = notes.join('\n');
    }

    // ── 防具アイテムモデル ──
    for (const armor of this.armorSets) {
      for (const part of Object.keys(armorParts)) {
        const id = `${armor.idPrefix}_${part}`;
        const model = {
          parent: "minecraft:item/generated",
          textures: { layer0: `${modId}:item/${id}` }
        };
        res[`assets/${modId}/models/item/${id}.json`] = JSON.stringify(model, null, 2);
        writeClientItem(id, `${modId}:item/${id}`);
      }
    }

    // ── 進捗JSON ──
    for (const adv of this.advancements) {
      const json = {
        display: {
          icon: { id: this._resolveItemId(adv.icon) },
          title: adv.title,
          description: adv.desc,
          frame: "task",
          show_toast: true,
          announce_to_chat: true
        },
        criteria: {
          trigger: {
            trigger: `minecraft:${adv.trigger}`
          }
        }
      };
      if (adv.trigger === 'inventory_changed') {
        json.criteria.trigger.conditions = {
          items: [{ items: this._resolveItemId(adv.icon) }]
        };
      }
      if (adv.parent) {
        json.parent = adv.parent.includes(':') ? adv.parent : `${modId}:${adv.parent}`;
      }
      res[`data/${modId}/advancements/${adv.advId}.json`] = JSON.stringify(json, null, 2);
    }

    // ── マイニングタグ (採掘ツール・レベル) ──
    const toolTags = { pickaxe: [], axe: [], shovel: [], hoe: [] };
    const miningLevelTags = {
      needs_stone_tool: [], needs_iron_tool: [],
      needs_diamond_tool: []
    };

    for (const blk of this.blocks) {
      if (blk.tool && blk.tool !== 'NONE') {
        const toolKey = blk.tool.toLowerCase();
        if (toolTags[toolKey]) {
          toolTags[toolKey].push(`${modId}:${blk.id}`);
        }
      }
      if (blk.miningLevel) {
        const levelMap = {
          STONE: 'needs_stone_tool',
          IRON: 'needs_iron_tool',
          DIAMOND: 'needs_diamond_tool'
        };
        const tagKey = levelMap[blk.miningLevel];
        if (tagKey && miningLevelTags[tagKey]) {
          miningLevelTags[tagKey].push(`${modId}:${blk.id}`);
        }
      }
    }

    // ツールタグ書き出し
    for (const [tool, values] of Object.entries(toolTags)) {
      if (values.length > 0) {
        res[`data/minecraft/tags/block/mineable/${tool}.json`] = JSON.stringify({
          replace: false,
          values: values
        }, null, 2);
      }
    }

    // マイニングレベルタグ書き出し
    for (const [level, values] of Object.entries(miningLevelTags)) {
      if (values.length > 0) {
        res[`data/minecraft/tags/block/${level}.json`] = JSON.stringify({
          replace: false,
          values: values
        }, null, 2);
      }
    }

    // ── ルートテーブル (ブロックを壊したらアイテムが出る) ──
    for (const blk of this.blocks) {
      if (blk.hasItem) {
        const lootTable = {
          type: "minecraft:block",
          pools: [{
            rolls: 1,
            entries: [{
              type: "minecraft:item",
              name: `${modId}:${blk.id}`
            }],
            conditions: [{
              condition: "minecraft:survives_explosion"
            }]
          }]
        };
        res[`data/${modId}/loot_tables/blocks/${blk.id}.json`] = JSON.stringify(lootTable, null, 2);
      }
    }

    return res;
  }
}
