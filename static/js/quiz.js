let qNum = 1
let x = 1
let score = 0
let evaluated = false
const qPanel = document.getElementById('q-panel')
const rPanel = document.getElementById('r-panel')
const markButton = document.getElementById('mark')
const unmarkButton = document.getElementById('unmark')

window.onload = ()=>{

    document.getElementById(qNum).className = document.getElementById(qNum).className.replace('inactive', 'active')
    Array.from(document.getElementsByClassName('question-no')).forEach(item=>{
        item.innerHTML = "Question No : "+x.toString()
        x++
    })

    const nextButton = document.getElementById('next')
    const prevButton = document.getElementById('prev')
    const evalButton = document.getElementById('eval')

    nextButton.addEventListener('click', ()=>{
        if (qNum < parseInt(qLen)) {
            cq = document.getElementById(qNum)
            nq = document.getElementById(qNum+1)
            cq.className = cq.className.replace('active', 'inactive')
            nq.className = nq.className.replace('inactive', 'active')
            qNum++
        }
    })

    prevButton.addEventListener('click', ()=>{
        if (qNum>1){
            cq = document.getElementById(qNum)
            pq = document.getElementById(qNum-1)
            cq.className = cq.className.replace('active', 'inactive')
            pq.className = pq.className.replace('inactive', 'active')
            qNum--
        }
    })

    evalButton.addEventListener('click', ()=>{
        tOptions = document.getElementsByClassName('True')
        Array.from(tOptions).forEach(item=>{
            item.nextSibling.parentNode.className='true'
        })
        if (!evaluated) {
            Array.from(tOptions).forEach(item=>{
                if (item.checked){
                    score++
                }
            })

            document.getElementById('score').className = 'score'
           
            // evaluated = true
            if ((score/qLen) > 0.5){
                document.getElementById('score').innerHTML = "Congratulations Your Score Is : " + score + " Out Of " + qLen
            } else {
                document.getElementById('score').innerHTML = "Uh Oh! Your Score Is : " + score + " Out Of " + qLen
            }
        } else {
            window.alert("This Quiz Has Already Been Evaluated !")
        }

        checkedButtons = document.getElementsByName('answer')
        Array.from(checkedButtons).forEach(item=>{
            if(item.checked) {
                if(item.className.includes('False')){
                    item.nextSibling.parentNode.className='false'
                    }
                }
           evaluated = true
        })
    })


    for (let i=0; i<qLen; i++) {
        const qBlock = document.createElement('button')
        qBlock.setAttribute('class', 'qItem btn btn-sm btn-success')
        qBlock.setAttribute('style', 'margin-left:1px;')
        qBlock.innerHTML = i + 1
        qPanel.appendChild(qBlock)
    }

    const qButtons = document.getElementsByClassName('qItem')
    Array.from(qButtons).forEach(item=>{
        item.addEventListener('click', ()=>{
            const q = document.getElementById(item.innerHTML)
            const cq = document.getElementById(qNum)
            cq.className = cq.className.replace('active', 'inactive')
            q.className = q.className.replace('inactive', 'active')
            qNum = parseInt(item.innerHTML)
        })
    })

    
    markButton.addEventListener('click', (e)=>{
        if (!evaluated){
            if (!document.getElementById(qNum).className.includes('marked')){
                const rBlock = document.createElement('button')
                rBlock.setAttribute('class', 'rItem btn-warning btn btn-sm')
                rBlock.setAttribute('id', 'r-' + qNum)
                rBlock.setAttribute('style', 'margin-left:1px;')
                rBlock.innerHTML = qNum
                rPanel.appendChild(rBlock)
                document.getElementById(qNum).className += ' marked'
            } else {
                window.alert("Already Marked For Review")
            }
        } else {
            window.alert("This Quiz Has Already Been Evaluated !")
        }

        unmarkButton.addEventListener('click', (e)=>{
            e.stopImmediatePropagation()
            if (!evaluated){
                if (document.getElementById(qNum).className.includes('marked')){
                    document.getElementById('r-' + qNum).remove()
                    document.getElementById(qNum).className = document.getElementById(qNum).className.replace(' marked', '')
                } else {
                    window.alert('This Question is not Marked for Review')
                }
            } else window.alert("This Quiz Has Already Been Evaluated !")
        })

        const rButtons = document.getElementsByClassName('rItem')
        Array.from(rButtons).forEach(item=>{
            item.addEventListener('click', ()=>{
                e.stopImmediatePropagation()
                const q = document.getElementById(item.innerHTML)
                const cq = document.getElementById(qNum)
                cq.className = cq.className.replace('active', 'inactive')
                q.className = q.className.replace('inactive', 'active')
                qNum = parseInt(document.getElementById(item.innerHTML).id)
            })
        })
    })
}

