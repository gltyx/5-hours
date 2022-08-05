function updateLonelyInfoDisplay() {
  if (player.currentChallenge === 'lonely') {
    document.getElementById('additional-devs-due-to-updates-info').innerHTML = ' (这可不会在孤独挑战里生效.)';
    document.getElementById('auto-dev-lonely-info').innerHTML = ' (在孤独挑战里怎么可能有用呢?)';
  } else {
    document.getElementById('additional-devs-due-to-updates-info').innerHTML = '';
    document.getElementById('auto-dev-lonely-info').innerHTML = '';
  }
}
