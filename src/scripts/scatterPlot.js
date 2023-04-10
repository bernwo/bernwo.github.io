// import * as echarts from 'echarts/core';
// import {ScatterChart} from 'echarts/charts';
// import {CanvasRenderer} from 'echarts/renderers';
// echarts.use([ScatterChart,CanvasRenderer]);

function generate_congruent_modulo_data(n, k) {
	return Array.from({ length: n }, (_, i) => [i, 2 * i - (i & ((1 << k) - 1))]);
}

function getScatterOption(size, x_label, y_label) {
	const textColour = "#f8f8f2";
	const option = {
		animation: false,
		xAxis: {
			minInterval: 1,
			min: 0,
			max: size - 1,
			name: x_label,
			nameTextStyle: {
				fontSize: 24,
				fontStyle: "italic",
				fontFamily: "serif",
			},
			axisLine: { lineStyle: { color: textColour } },
		},
		yAxis: {
			minInterval: 1,
			min: 0,
			max: size - 1,
			name: y_label,
			nameTextStyle: {
				fontSize: 24,
				fontStyle: "italic",
				fontFamily: "serif",
			},
			axisLine: { lineStyle: { color: textColour } },
		},
	};
	return option;
}

function getScatterData(dataArray) {
	const option = {
		series: [
			{
				type: "scatter",
				data: dataArray,
				symbolSize: 6,
				label: {
					show: false,
					fontSize: 16,
					borderWidth: 1,
				},
				itemStyle: {
					opacity: 1,
					color: "#ef5455",
				},
				emphasis: {
					label: {
						show: false,
					},
					itemStyle: {
						color: "#900",
					},
				},
			},
		],
	};
	return option;
}

export function createCongruentModScatter(inputID, size) {
	const chartDom = document.getElementById(inputID);
	const display = document.getElementById("current-congruent-number");
	const slider = document.getElementById("congruent-number-slider");
	if (chartDom != null && display != null && slider != null) {
		let myChart = echarts.init(chartDom);
		const option = getScatterOption(size, "n", "y");
		const optionData = getScatterData(generate_congruent_modulo_data(size, slider.value));
		myChart.setOption(option);
		myChart.setOption(optionData);
		display.innerHTML = slider.value;
		slider.addEventListener("touchstart", () => {lockScroll();});
		slider.addEventListener("touchend", () => {lockScroll();});
		slider.oninput = function() {
			display.innerHTML = this.value;
			myChart.setOption(getScatterData(generate_congruent_modulo_data(size, this.value)));
		}
	}
}

function lockScroll() {
	document.body.classList.toggle('fixed-position');
}
