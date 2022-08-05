function loadGame(s, offlineProgress) {
  // offlineProgress = null means leave it up to the save.
  var a = LZString.decompressFromBase64(s)
  if(a!=null) player = JSON.parse(a);
  else player = {}
  if (offlineProgress === null) {
    offlineProgress = player.options.offlineProgress;
  }
  fixPlayer();
  convertSaveToDecimal();
  // We can do this after fixing Decimal.
  let now = Date.now();
  if (offlineProgress) {
    simulateTime((now - player.lastUpdate) / 1000);
  }
  player.lastUpdate = now;
  saveGame();
  fillInInputs();
  updateTabDisplay();
  updateCompletionMilestoneDisplay();
  updateAchievementDisplay();
  updateLoreDisplay();
  updateOtherDisplay();
}

function simulateTime(totalDiff) {
  let baseTickLength = 0.05;
  let ticks = Math.ceil(Math.min(totalDiff / baseTickLength, 1000));
  let tickLength = totalDiff / ticks;
  for (let i = 0; i < ticks; i++) {
    gameCode(tickLength);
  }
}

function fixPlayer () {
  if (!('enlightened' in player)) {
    player.enlightened = 0;
  }
  if (!('updates' in player)) {
    player.updatePoints = new Decimal(0);
    player.updates = 0;
    player.experience = [new Decimal(0), new Decimal(0), new Decimal(0)];
    player.power = [new Decimal(0), new Decimal(0), new Decimal(0)];
  }
  if (!('upgrades' in player)) {
    player.upgrades = [[false, false, false], [false, false, false]];
    player.auto = {
      dev: {
        settings: [0, 0, 0, 0, 0],
        on: false
      }
    }
  }
  if (!('options' in player)) {
    player.options = {
      confirmations: {
        prestige: true,
        prestigeWithoutGain: true,
        update: true,
        enterChallenge: true,
        exitChallenge: true
      },
      offlineProgress: true,
      updateChallenge: true,
      hardMode: false
    }
  }
  if (!('tab' in player)) {
    player.tab = 'main';
  }
  if (!('stats' in player)) {
    player.stats = {
      'recordDevelopment': 0
    }
  }
  if (!('currentChallenge' in player)) {
    player.currentChallenge = '';
    player.stats.recordDevelopment = {
      '': player.stats.recordDevelopment,
      'logarithmic': 0,
      'inefficient': 0,
      'ufd': 0,
      'lonely': 0,
      'impatient': 0,
      'unprestigious': 0,
      'slow': 0,
      'powerless': 0,
      'upgradeless': 0
    };
    player.options.confirmations.enterChallenge = true;
    player.options.confirmations.exitChallenge = true;
  }
  if (!('offlineProgress' in player.options)) {
    player.options.offlineProgress = true;
  }
  if (!('dilation' in player)) {
    player.dilation = 0;
  }
  if (!('last' in player.stats)) {
    player.stats.last = {
      enlightened: Date.now(),
      prestige: Date.now(),
      update: Date.now(),
      prestigeType: null,
      updatePointGain: new Decimal(0)
    }
  }
  if (!('enlightened' in player.auto)) {
    player.auto.enlightened = {
      setting: '启迪次数',
      value: new Decimal(0),
      displayValue: '0',
      on: false
    };
    player.auto.prestige = {
      setting: '新增更新时间',
      value: new Decimal(0),
      displayValue: '0',
      initial: 5,
      alternate: true,
      on: false
    };
    player.auto.update = {
      setting: '更新时间',
      value: new Decimal(0),
      displayValue: '0',
      on: false
    };
  }
  if (!('updateChallenge' in player.options)) {
    player.options.updateChallenge = true;
  }
  if (!('achievements' in player)) {
    player.achievements = {
      list: [
        false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false
      ],
      number: 0,
      stats: {
        savingTokens: true,
        noDevsForThat: true
      }
    }
  }
  if (!('lore' in player)) {
    player.lore = [];
  }
  for (let i in player.auto) {
    if (player.auto[i].setting && i in AUTO_SETTINGS && AUTO_SETTINGS[i].indexOf(player.auto[i].setting) === -1) {
      alert('Your ' + i + ' auto setting\'s name is no longer a possible setting. It has been reset.');
      player.auto[i].setting = AUTO_SETTINGS[i][0];
    }
  }
  if (!('hardMode' in player.options)) {
    player.options.hardMode = false;
  }
  if (!('completionMilestones' in player)) {
    player.completionMilestones = 0;
    player.auto.assignUpdatePoints = {
      settings: [0, 0, 0],
      on: false
    }
  }
  if (!('dilationUpgradesBought' in player)) {
    player.dilationUpgradesBought = 0;
  }
  if (typeof player.dilationUpgradesBought === 'number') {
    player.dilationUpgradesBought = [player.dilationUpgradesBought];
  }
  if (!('normal' in player.achievements)) {
    player.achievements = {
      normal: {
        list: player.achievements.list,
        number: player.achievements.number
      },
      lategame: {
        list: [false, false, false, false, false, false, false, false, false],
        number: 0
      },
      stats: player.achievements.stats
    }
  }
  if (!('yoDawg' in player.achievements.stats)) {
    player.achievements.stats.yoDawg = 0;
  }
  if (!('turnAllUpdatePointsIntoExperience' in player.options.confirmations)) {
    player.options.confirmations.turnAllUpdatePointsIntoExperience = true;
  }
}

function convertSaveToDecimal () {
  player.updatePoints = new Decimal(player.updatePoints);
  for (let i = 0; i <= 2; i++) {
    player.experience[i] = new Decimal(player.experience[i]);
    player.power[i] = new Decimal(player.power[i]);
  }
  for (let i = 0; i <= 2; i++) {
    player.auto[AUTO_LIST[i]].value = new Decimal(player.auto[AUTO_LIST[i]].value);
  }
  player.stats.last.updatePointGain = new Decimal(player.stats.last.updatePointGain);
}

function loadGameStorage () {
  if (!localStorage.getItem('5hours-save')) {
    resetGame();
  } else {
    try {
      // We're loading from storage, player.options.offlineProgress isn't set yet.
      loadGame(localStorage.getItem('5hours-save'), null);
    } catch (ex) {
      console.log('加载的时候报错了,请反馈这件事.', ex);
      resetGame();
    }
  }
}

function loadGamePrompt() {
  try {
    let save = prompt('输入你的存档(注意:汉化版与原版存档并不共通):');
    if (save && !(/^\s+$/.test(save))) {
      loadGame(save, player.options.offlineProgress);
    } else if (save !== null) {
      alert('你似乎输入了一个空的存档.');
    }
  } catch(ex) {
    alert('你似乎输入了一个错误的存档.报错信息是: ' + ex);
  }
}

function saveGame () {
  localStorage.setItem('5hours-save', LZString.compressToBase64(JSON.stringify(player)))
}

function exportGame () {
  let output = document.getElementById('export-output');
  let parent = output.parentElement;
  parent.style.display = "";
  output.value = LZString.compressToBase64(JSON.stringify(player));
  output.focus();
  output.select();
  try {
    document.execCommand('copy');
  } catch(ex) {
    alert('复制到剪切板这一操作似乎失败了.');
  }
}

let initialPlayer = {
  progress: [0, 0, 0, 0, 0, 0, 0, 0], // in seconds, or for the last from 0 to 1
  devs: [0, 0, 0, 0, 0],
  milestones: 0,
  enlightened: 0,
  updatePoints: new Decimal(0),
  updates: 0,
  experience: [new Decimal(0), new Decimal(0), new Decimal(0)],
  power: [new Decimal(0), new Decimal(0), new Decimal(0)],
  upgrades: [[false, false, false], [false, false, false]],
  auto: {
    dev: {
      settings: [0, 0, 0, 0, 0],
      on: false
    },
    enlightened: {
      setting: '启迪次数',
      value: new Decimal(0),
      displayValue: '0',
      on: false
    },
    prestige: {
      setting: '新增更新时间',
      value: new Decimal(0),
      displayValue: '0',
      initial: 5,
      alternate: true,
      on: false
    },
    update: {
      setting: '更新时间',
      value: new Decimal(0),
      displayValue: '0',
      on: false
    },
    assignUpdatePoints: {
      settings: [0, 0, 0],
      on: false
    }
  },
  options: {
    confirmations: {
      prestige: true,
      prestigeWithoutGain: true,
      turnAllUpdatePointsIntoExperience: true,
      update: true,
      enterChallenge: true,
      exitChallenge: true
    },
    offlineProgress: true,
    updateChallenge: true,
    hardMode: false
  },
  tab: 'main',
  currentChallenge: '',
  stats: {
    'recordDevelopment': {
      '': 0,
      'logarithmic': 0,
      'inefficient': 0,
      'ufd': 0,
      'lonely': 0,
      'impatient': 0,
      'unprestigious': 0,
      'slow': 0,
      'powerless': 0,
      'upgradeless': 0
    },
    last: {
      enlightened: Date.now(),
      prestige: Date.now(),
      update: Date.now(),
      prestigeType: null,
      updatePointGain: new Decimal(0)
    }
  },
  achievements: {
    normal: {
      list: [
        false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false
      ],
      number: 0
    },
    lategame: {
      list: [false, false, false, false, false, false, false, false, false],
      number: 0
    },
    stats: {
      savingTokens: true,
      noDevsForThat: true,
      yoDawg: 0
    }
  },
  lore: [],
  dilation: 0,
  dilationUpgradesBought: [0],
  completionMilestones: 0,
  lastUpdate: Date.now()
}

function resetGame() {
  // The false here sets Date.now() to when the game was reset
  // rather than when the window was loaded.
  loadGame(LZString.compressToBase64(JSON.stringify(initialPlayer)), false);
}

function resetGameWithConfirmation() {
  if (confirm('你真的想要硬重置吗? 所有东西都会被重置,并且你不会因此获得任何加成.')) {
    resetGame();
  }
}
