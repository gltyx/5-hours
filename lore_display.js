const LORE_LIST = [
  '你有了个新游戏的好想法,因此你急切的想要开始做这个游戏.制作这个游戏看起来很简单,就算只给你5小时都够你做完它了.',
  '你开始制作了.至少目前,看起来所有事情都很完美,都在按照你的计划进行.',
  '奇怪,你只完成了两分钟的工作进度?可你觉得时间好像不止过了两分钟啊?',
  '制作速度异常的情况仍然在发生.时间本身是扭曲的么?恐怕不是:你或许只是给了自己不切实际的期望.希望事情不要变得更糟吧.',
  '你想着得招个员工来帮忙.可...他们看起来和你一样“高效”?',
  '你对高效工作的学习有了成效.你现在做事的效率提高了20%,情况应该只会变得越来越好.',
  '看起来不符预期大部分是不好的编程习惯导致的?你试图去重构你的代码,看起来这对你的工作进展很有成效.',
  '高效的工作方式和重构完全不够.你决定从头开始重新写这个游戏,从你以前所做的事中汲取经验.',
  '进度仍然在放缓...就是从头开始写也不行.或许这只是因为你太着急了,你需要的可能只是耐心,慢慢等待游戏的制作过程.',
  '你有了耐心,但看来还不够...你似乎快完成了,但又似乎差了点什么.你可能需要做一些能启发你自己的事.',
  '你开窍了.除去一些玄之又玄的效果外,这似乎还让你更有耐心了.你感觉,重新开始这个项目可能会让你失去你此时的灵感.',
  '你终于完成了你想做的游戏,但你又想到了很多可以添加的内容.或许你还可以继续更新这个游戏.',
  '你从以前的几次更新中汲取了经验,因而你能够制作更大的更新了.你这一轮更新又能完成多少呢?',
  '看来你已经掌握诀窍了.更新过程有点单调,但你觉得这很快就会改变.或许24:00:00就是一个巨大的转折点.',
  '你决定使用一门新的编程语言.你对这门语言极其不熟练,但你听说它可能带给你一些新的启发,所以你尝试了下这门语言.',
  '你的一个员工告诉你高效的工作方法被严重高估了.所以你决定以后尝试一下不学习高效的工作方法,以节省时间.',
  '好吧,效率比你想的更重要.这样的话,正如另一个员工所说的,被高估的可能是代码重构.你决定试一次不进行代码重构.',
  '事实证明,这两个想法里完全找不到任何正确的地方.为了避免再次被别人的想法干扰,你决定独自一人开发.',
  '太慢了,都太慢了!光等着有什么用?耐心有什么用?你做出了放弃耐心的决定.',
  '开发,从头开发,再次从头开发...一次次的从头制作未免太过于烦人了吧!至少在下次更新里,你不想再从头开始制作你的游戏了.',
  '你给自己制订了一次旅游计划,并且会带着所有员工一起.这样你不会有多少更新游戏的时间,但这都不是什么问题,对吧?',
  '经验有用么?它给你了一些所谓的“能力”,但看起来没多大用.你想试着不去管它.',
  '除了给你能量以外,经验似乎还给你了什么影响来着.回想以前几次更新里,好像完全没它们什么事.你想看看没有它们会怎么样.',
  '哇,你终于明白了这门编程语言.事情开始好转起来了.',
  '或许你结论下的有点早:你感觉自己通过这门新语言得到了一些新东西,你称之为“膨胀时间”.虽然你拥有这些东西,但你却难以对别人描述它们.',
  '你仍然没有完全明白所谓的“膨胀时间”到底是什么,不过只要能起作用就行.你觉得自己差不多有足够的膨胀时间了.',
  '你有着极多的灵感,但似乎意义不大.',
  '不少人在为你的这款游戏工作.你决定不再想还有没有人能去玩你的游戏这一问题了.',
  '好的,你终于达到了目标.你大量高质量的更新让你的游戏被认为是世界上最好的游戏.不过你仍然觉得还有不少东西能够被添加,你自己都不清楚自己最终能够做到怎么样.',
  '你做到的不仅仅是让你的游戏变成世界上最好的游戏,你还完成了一切你觉得与开发这个游戏有关的事,甚至毫不相干的“膨胀时间”也被大量地获取了.接下来你该做什么?你自己也不是很明白.',
  '你发现你的意识中有什么东西说了句话:“是的,那就是全部的内容,你已经达到了这一切游戏内容的结尾.”你不是很明白它在讲什么; 你仍然有很多能够实现的想法.“你可以选择继续游玩(或许还能看见些什么,但还有谁会在意呢?)或者硬重置.”什么?“无论如何,恭喜你玩到这里,感谢游玩,我希望你能够享受游玩这个游戏的过程.”',
  '不久之后,你遇见了一个人,她似乎对见到你这件事很惊讶.她说她刚刚通关了你的游戏,正在想接下来还能做什么.你回答道:“你可以继续游玩或者硬重置.”突然,你就似乎明白了你脑海中的声音,“你也可以制作你自己的游戏,或许也能变得流行呢?”',
  '当你说完这句话之后,你回想起了你在制作游戏中走过的路,从开始开发到现在所经历的一切.你又回想起,对于一个玩家,他游玩的过程也正如你开发的过程:提高技巧,投入时间什么的...你听见意识中传来一句话:“我也是.”(好像并不是这样,这个游戏制作起来还挺简单的,但请忽视掉这个括号,谢谢),你露出了微笑.'
];

function updateLoreDisplay() {
  let loreShown = LORE_LIST.map((lore, i) => (player.lore.indexOf(i) === -1) ? '' : lore);
  while (loreShown[loreShown.length - 1] === '') {
    loreShown.pop();
  }
  document.getElementById('lore-div').innerHTML = loreShown.join('<br/>') + '<hr/>';
}
