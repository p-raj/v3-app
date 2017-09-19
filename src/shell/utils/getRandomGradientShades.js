export default function getRandomGradientShades() {

    let randomNumber = Math.floor((Math.random() * 10) + 1);
    return gradientsList[randomNumber];
}

let gradientsList = [
    ["#FF5E3A", "#FF2A68"],
    ["#FF9500", "#FF5E3A"],
    ["#FFDB4C", "#FFCD02"],
    ["#87FC70", "#0BD318"],
    ["#52EDC7", "#5AC8FB"],
    ["#1AD6FD", "#1D62F0"],
    ["#C644FC", "#5856D6"],
    ["#EF4DB6", "#C643FC"],
    ["#1D77EF", "#81F3FD"],
    ["#34AADC", "#007AFF"],
    ["#FB2B69", "#FF5B37"],

];