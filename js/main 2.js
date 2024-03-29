
//즉시 실행함수

(function () {
  const graphicElms = document.querySelectorAll('.graphic-item')
  const stepElms = document.querySelectorAll('.step')
  let currentItem = graphicElms[0];  //현재 활성화된 (visible 클라스가 붙은).graphic-item
  let ioIndex; //IntersectionObserver로 관찰되는 .step번호
    
  const io = new IntersectionObserver((entries,observer)=>{
    // console.log(entries[0].target.dataset.index)
    ioIndex = entries[0].target.dataset.index *1
  })


  //data-index 속성 부여
  for (let i = 0; i < stepElms.length; i++) {
    io.observe(stepElms[i])   //관찰대상 등록
    stepElms[i].dataset.index = i;
    graphicElms[i].dataset.index = i;
  }

  //활성화 / 비활성화 함수 분리
  function activate(){
    currentItem.classList.add('visible')
  }
  function inActivate(){
    currentItem.classList.remove('visible')
  }






  window.addEventListener('scroll', () => {
    let step; //변수 설정
    let boundingRect;

    for (let i=ioIndex-1; i<ioIndex+2; i++) {   //ioIndex 시작이 0임 -1을 빼주는 게 성립 X
      step = stepElms[i];

      if(!step) continue; // ioIndex 시작이 0임 -1을 빼주는 게 성립 X -> for문 실행하지않고 빠져나가게

      boundingRect = step.getBoundingClientRect()
      // console.log(boundingRect.top)

      if (boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.9) {
        // console.log(step.dataset.index)

        if (currentItem){
          inActivate();
        }
        currentItem = graphicElms[step.dataset.index]
        activate();
      }
    }
  })

  activate(); //로딩시 바로 실행 (첫번째 이미지가 보이는 상태로 시작하게)
})()