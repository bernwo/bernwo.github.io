---
title: "Interactive plot"
description: "Showcasing an example interactive plot on my website"
publishDate: "07 April 2023"
tags: ["plot", "math"]
---

## Randomised 3D bar chart

Below is an interactive 3D bar chart that I plotted using
<a href="https://echarts.apache.org/" target="_blank" rel="noopener noreferrer" class="cactus-link inline-block">
ECharts.js
</a>. This JavaScript library uses <a target="_blank" rel="noopener noreferrer" class="cactus-link inline-block" href="https://en.wikipedia.org/wiki/WebGL">WebGL</a> under the hood to render the chart that you're seeing, and thus has high performance.

<div class="echarts" id="randomised-bar3d-chart"></div>

The data used in the plot is generated via client-sided JavaScript (see code block below), and is uniformly random, which is sufficient for a simple toy model. Thus, every time you refresh this page, the chart would look a little bit different. Here is the corresponding JavaScript code to generate the data in the format need by <a href="https://echarts.apache.org/"  target="_blank" rel="noopener noreferrer" class="cactus-link inline-block">
ECharts.js
</a>

```js
// You can see this in the source code of my page too.
function generate_random_data(n) {
	return Array.from({ length: n * n }, (_, i) => [~~(i / n), i % n, Math.random()]);
}
```

## Animated 3D bar chart

Here we have a plot of the same type, i.e., 3D bar chart, but its data updates temporally. In this particular example, I'm plotting the function

$$
\frac{1}{2}\left(\sin{\left(\phi+\omega\sqrt{\left(x-\frac{n}{2}\right)^2+\left(y-\frac{n}{2}\right)^2}\right)} + 1\right),
$$

where $\phi$ is the phase which I chose to update every 500 milliseconds, $\omega=1/3$ is the frequency, and $n=25$ is the dimension of the plot.

<div class="echarts" id="sine-wave-bar3d-chart"></div>

Here is the corresponding JavaScript code to generate the data in the format need by <a href="https://echarts.apache.org/" target="_blank" rel="noopener noreferrer" class="cactus-link inline-block">
ECharts.js
</a>

```js
// You can see this in the source code of my page too.
function generate_sine_wave_data(n, phase) {
	return Array.from({ length: n * n }, (_, i) => [
		~~(i / n), // Note that `~~` is shorthand for `floor` in JavaScript.
		i % n,
		(Math.sin(phase + (1 / 3) * Math.sqrt((~~(i / n) - n / 2) ** 2 + ((i % n) - n / 2) ** 2)) + 1) /
			2,
	]);
}
```

Of course, a 3D bar chart is not the only way one can visualise the data. <a href="https://echarts.apache.org/" target="_blank" rel="noopener noreferrer" class="cactus-link inline-block">
ECharts.js
</a> offers a lot of different plot types, and you can check them out <a href="https://echarts.apache.org/examples/" target="_blank" rel="noopener noreferrer" class="cactus-link inline-block">here</a>.

## Why?

I've always wanted to write a blog with pedagogical elements present, and what better way to achieve that than to include beautiful visualisations that are interactive and animated. To avoid re-inventing the wheel, I looked for available JavaScript libraries that allow me to plot. There were many promising candidates, alas most of them are either missing a feature that I wanted or is too low-level. Except for <a href="https://echarts.apache.org/"  target="_blank" rel="noopener noreferrer" class="cactus-link inline-block">
ECharts.js
</a>, which I found to be perfect for my use-case.

Besides wanting to write a blog with pedagogical elements, I also wanted to learn how to write JavaScript and use external libraries, which is why I came up with the toy models that you're seeing on this page. Despite coming from a physics background with minimal frontend development experience, I was able to whip this page up in less than a week from zero. It was super fun! 🥳
