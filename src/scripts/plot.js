// From global.css
const darkTextColour = "#f8f8f2";

function generate_random_data(n) {
	return Array.from({ length: n * n }, (_, i) => [~~(i / n), i % n, Math.random()]);
}

export function getBar3Doption(size) {
	const textColour = darkTextColour;
	const colorLength = 32;
	// prettier-ignore
	const colorScale = d3.scaleSequential(d3.interpolateRdPu).domain([0, 1]);
	// prettier-ignore
	const colorData = Array.from({ length: colorLength }, (_, j) => colorScale(1 - j / colorLength));
	const option = {
		animation: false,
		tooltip: {
			show: true,
			confine: false,
			trigger: "item",
			axisPointer: { label: { show: true } },
			backgroundColor: "#ffffffea",
		},
		visualMap: {
			max: 1,
			min: 0,
			inRange: { color: colorData },
		},
		xAxis3D: {
			minInterval: 1,
			min: 0,
			max: size - 1,
			name: "i",
			nameTextStyle: {
				fontSize: 24,
				fontStyle: "italic",
				fontFamily: "serif",
			},
			axisLine: { lineStyle: { color: textColour } },
		},
		yAxis3D: {
			minInterval: 1,
			min: 0,
			max: size - 1,
			name: "j",
			nameTextStyle: {
				fontSize: 24,
				fontStyle: "italic",
				fontFamily: "serif",
			},
			axisLine: { lineStyle: { color: textColour } },
		},
		zAxis3D: {
			type: "value",
			minInterval: 1,
			min: 0,
			max: 1,
			name: "|ρᵢⱼ|",
			nameTextStyle: {
				fontSize: 33,
				fontStyle: "italic",
				fontFamily: "serif",
			},
			interval: 1,
			axisLine: { lineStyle: { color: textColour } },
		},
		grid3D: {
			show: true,
			boxWidth: 120,
			boxDepth: 120,
			boxHeight: 35,
			viewControl: {
				projection: "orthographic",
				panMouseButton: "right",
				rotateMouseButton: "left",
			},
		},
	};
	return option;
}

export function getBar3Ddata(size) {
	const option = {
		series: [
			{
				name: "ρᵢⱼ",
				type: "bar3D",
				data: generate_random_data(size).map((item) => {
					return {
						value: [item[0], item[1], item[2]],
					};
				}),
				shading: "lambert",
				barSize: 120 / size,
				label: {
					show: false,
					fontSize: 16,
					borderWidth: 1,
				},
				itemStyle: {
					opacity: 1,
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

export function createBar3D(inputID, size) {
	const chartDom = document.getElementById(inputID);
	if (chartDom != null) {
		let myChart = echarts.init(chartDom);
		const option = getBar3Doption(size);
		const optionData = getBar3Ddata(size);
		myChart.setOption(option);
		myChart.setOption(optionData);
		return myChart;
	}
}
