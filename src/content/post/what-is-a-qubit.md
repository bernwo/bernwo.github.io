---
title: "What is a qubit?"
description: "Quantum bit explained in a technical manner with animation"
publishDate: "08 August 2021"
tags: ["math", "quantum computing"]
---

## Single qubit

The general expression of a single qubit in <i>computational basis</i> is given by

$$ | \psi \rangle = \alpha | 0 \rangle + \beta | 1 \rangle \label{qubit} $$

where $\alpha,\beta\in\mathbb{C}$ and it must follow that the expression is normalised, (i.e. $\|\alpha \|^2 + \| \beta \|^2=1$). Computational basis refers to the fact that $\| 0 \rangle$ and $\| 1 \rangle$ were used to described the qubit state $\| \psi \rangle$. In literature, people often instead convey the message in the following manner: <i>"The qubit state $\| \psi \rangle$ is written using the following basis $\\{\| 0 \rangle,\| 1 \rangle\\}$"</i>.

Now, you may be wondering, <i>"what on earth is $\|0\rangle$ or $\|1\rangle$?"</i>. Well, they are referred to what is known as "<i>ket 0 / ket 1</i>" in Dirac notation and they are basically shorthand for <i>vectors</i> or <i>column matrices</i>. Below, we write the relationship explicitly.

$$
|0\rangle=
\begin{pmatrix}1 \\\\ 0\end{pmatrix}
,\quad
|1\rangle=
\begin{pmatrix}0 \\\\ 1\end{pmatrix} \label{}
$$

It may seem that we need 4 degrees of freedom (which are real numbers in this case) to describe the qubit state since each of the 2 complex constants are described using two real numbers. However, by using <a href="https://en.wikipedia.org/wiki/3-sphere#Hopf_coordinates" target="_blank" rel="noopener noreferrer">Hopf coordinates</a>, we can rewrite the expression in Equation \[\ref{qubit}\] like so

$$
|\psi\rangle=
\cos \frac{\theta}{2} |0\rangle + e^{i\phi} \sin \frac{\theta}{2} |1\rangle \label{hopf}
$$

where we have omitted the global phase factor $e^{i\psi}$ because it is irrelevant in the sense that it has no physically observable meaning. As we can see from Equation \[\ref{hopf}\], the number of degrees of freedom needed to describe the qubit state has reduced from 4 to 2.

From Equation \[\ref{qubit}\], we see that the possible states that our single qubit can take on is a continuum, as opposed to a classical bit, which can take on only state $0$ or $1$. It is this property which gives qubits advantage over the classical bits.

Besides the computational basis, there are also the $X$-basis ($\\{\| - \rangle,\| + \rangle\\}$) and the $Y$-basis ($\\{\| -i \rangle,\| +i \rangle\\}$), where each of these can be expressed in terms of $\|0\rangle$ and $\|1\rangle$ as shown below

$$
|-\rangle=\frac{1}{\sqrt{2}}(|0\rangle-|1\rangle)
,\quad
|+\rangle=\frac{1}{\sqrt{2}}(|0\rangle+|1\rangle)
$$

$$
|-i\rangle=\frac{1}{\sqrt{2}}(|0\rangle-i|1\rangle)
,\quad
|+i\rangle=\frac{1}{\sqrt{2}}(|0\rangle+i|1\rangle)
$$

## Animation

The computational basis, also known as the $Z$-basis, together with the $X$- and $Y$-basis can be plotted as along the $z$, $x$, and $y$ axis in the Bloch sphere representation, respectively. An animation showing how the qubit state can be represented as a Bloch vector along the Bloch sphere (which is a unit-sphere) in 3D space can be seen below.

<!-- <video src="../assets/media/animated/Qubit.mp4" autoplay muted loop></video> -->
<img src="https://raw.githubusercontent.com/bernwo/bernwo/main/assets/Qubit.gif" height="180">
