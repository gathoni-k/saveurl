async function addItem(link, tag) {
    fetch("https://notion-save-url.herokuapp.com/add-url", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        mode: "cors",
        body: JSON.stringify({link, tag})
    }).then(res => {
        return res.json()
    }).then(data => {
        return data
    }). catch ((error) => {
        console.log(error)
        return false
  })
}

// notion script ends

const saved = document.getElementById("saved")

const resourceBtn = document.getElementById("resource-btn")
const tabBtn = document.getElementById("tab-btn")

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const response = addItem(tabs[0].url, "job")
        render(response)
    })
})
resourceBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const response = addItem(tabs[0].url, "resource")
        render(response)
    })   
})

function render(response) {
    saved.innerHTML = response?"Saved!":"Failed to save!"
}
