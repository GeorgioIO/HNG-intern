const time = document.querySelector('[data-testid="currentTimeUTC"]');
const battery = document.querySelector(".battery");
const batteryPercentageElement = document.querySelector(".percentage");
const changeButton = document.querySelector(".changeBtn")

changeButton.addEventListener("click" , (event) => {
    document.querySelector(".front").classList.add("slideFrontRight");

    setTimeout(() => {
        const header = document.querySelector(".front .header");
        const backHeader = header.cloneNode(true);
        document.querySelector(".back").appendChild(backHeader)
    }, 100);

    setTimeout(() => {
        document.querySelector(".front").style.display = "none";
        document.querySelector(".back").style.display = "flex";
        document.querySelector(".card").style.height = "auto"
    }, 700)

    


    
})


// Change battery cols and percentage
function manipulateBattery()
{
    getBattery().then(function(percentage){
        let batteryPercentage = percentage;
        let btrObject = getCols(batteryPercentage);
        for(let i = 0 ; i < btrObject.div ; i++)
        {
            const div = document.createElement("div");
            battery.appendChild(div);
        }
        battery.setAttribute("style" , `grid-template-columns : repeat(${btrObject.cols} , 2px);`)
        batteryPercentageElement.innerHTML = batteryPercentage + "%";

    })
}

// Get back cols and divs for battery
function getCols(percentage)
{
    if(percentage >= 90 && percentage <= 100)
    {
        return {cols : 8 , div : 16};
    }
    else if (percentage >= 70 && percentage < 90)
    {
        return {cols : 6 , div : 12};
    }
    else if (percentage >= 50 && percentage < 70)
    {
        return {cols : 4 , div : 8};
    }
    else if(percentage >= 20 && percentage < 50)
    {
        return {cols : 2 , div : 4};
    }
    else
    {
        return {cols : 1 , div : 2};
    }
}

// Return battery percentage 
function getBattery()
{
    return currentBatteryPercentage = navigator.getBattery().then(function(battery) {
        return battery.level * 100;
    })
}

function getTime()
{
    let time = new Date()
    return new Intl.DateTimeFormat("default"  , {hour12 : true , hour : "numeric" , minute : "numeric"}).format(time);
}

window.addEventListener("load" , (event) => {
    time.innerHTML = getTime();
    manipulateBattery();
})

