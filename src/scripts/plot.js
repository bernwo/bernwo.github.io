// import {scaleSequential, interpolateMagma} from 'd3';
let {Bar3DChart, Grid3DComponent} = await import('./echartsImportHelper.js');
import * as echarts from 'echarts/core';
import { TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';


echarts.use([
  TooltipComponent,
  VisualMapComponent,
  Grid3DComponent,
  Bar3DChart,
  CanvasRenderer
]);

const nameTextStyleConfig =	{
	fontSize: 24,
	fontStyle: "italic",
	fontFamily: "serif",
};

// From global.css
const darkTextColour = "#f8f8f2";

function generate_random_data(n) {
	return Array.from({ length: n * n }, (_, i) => [~~(i / n), i % n, Math.random()]);
}

function generate_sine_wave_data(n, phase) {
	return Array.from({ length: n * n }, (_, i) => [
		~~(i / n),
		i % n,
		(Math.sin(phase + (1 / 3) * Math.sqrt((~~(i / n) - n / 2) ** 2 + ((i % n) - n / 2) ** 2)) + 1) /
			2,
	]);
}

function getBar3Doption(size, x_label, y_label, z_label) {
	const textColour = darkTextColour;
	const colorLength = 32;
	// prettier-ignore
	const colorScale = d3.scaleSequential(d3.interpolateMagma).domain([0, 1]);
	// prettier-ignore
	const colorData = Array.from({ length: colorLength }, (_, j) => colorScale(j / colorLength));
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
			name: x_label,
			nameTextStyle: nameTextStyleConfig,
			axisLine: { lineStyle: { color: textColour } },
		},
		yAxis3D: {
			minInterval: 1,
			min: 0,
			max: size - 1,
			name: y_label,
			nameTextStyle: nameTextStyleConfig,
			axisLine: { lineStyle: { color: textColour } },
		},
		zAxis3D: {
			type: "value",
			minInterval: 1,
			min: 0,
			max: 1,
			name: z_label,
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

function getBar3Ddata(size, dataArray, name) {
	const option = {
		series: [
			{
				name: name,
				type: "bar3D",
				data: dataArray.map((item) => {
					return {
						value: [item[0], item[1], item[2]],
					};
				}),
				shading: "lambert",
				barSize: 120 / size,
				label: {
					show: false,
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

export function createRandomisedBar3D(inputID, size) {
	const chartDom = document.getElementById(inputID);
	if (chartDom != null) {
		let myChart = echarts.init(chartDom);
		const option = getBar3Doption(size, "x", "y", "z");
		const optionData = getBar3Ddata(size, generate_random_data(size), "Random data");
		myChart.setOption(option);
		myChart.setOption(optionData);
	}
}

export function createSineWaveBar3D(inputID, size) {
	const chartDom = document.getElementById(inputID);
	if (chartDom != null) {
		let myChart = echarts.init(chartDom);
		const option = getBar3Doption(size, "x", "y", "z");
		const optionData = getBar3Ddata(size, generate_sine_wave_data(size, 0), "Sine Wave");
		myChart.setOption(option);
		myChart.setOption(optionData);
		let i = 0;
		const updateInterval = 500;
		setInterval(() => {
			i++;
			myChart.setOption({
				series: {
					data: generate_sine_wave_data(size, -i / 2),
				},
			});
		}, updateInterval);
	}
}



// https://echarts.apache.org/examples/en/editor.html?c=graph-force-dynamic
