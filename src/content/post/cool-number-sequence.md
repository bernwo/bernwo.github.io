---
title: "Cool number sequence #0"
publishDate: "07 April 2023"
description: "This is a series where I talk about cool number sequences that I found and expound on them: Congruent numbers"
tags: ["math"]
---

## Congruent numbers

Some time ago whilst researching for my Master thesis[^mscthesis], I stumbled upon a pretty cool number sequence, which goes

$$
a_n=\\{0,1,2,3,8,9,10,11,16,17,18,19,\ldots\\},\label{eqn:congmod4}
$$

with $n\geq0$. Do you notice what is the pattern of the sequence shown in eqn ($\ref{eqn:congmod4}$) above? If yes, congratulations! You are adept at noticing patterns! If not, that's also fine, we shall go through this together.

The pattern of the sequence is that it is just the usual non-negative integer sequence, _but every other 4 numbers are skipped!_ Now, if you're like me, you're probably wondering

> How does one even write a formula for generating such a sequence?

Well, fret not, turns out this sequence is already on the Online Encyclopedia of Integer Sequences (OEIS) and it's sequence number A047454[^A047454], albeit offset by 1. One of the formulas given on the page is (adjusted to start from 0)

$$
a_n=(-3+(-1)^n+(1+i) (-i)^n+(1-i) i^n+4 n)/2,\label{eqn:congmod4-1}
$$

where $i=\sqrt{i}$. We can perform a sanity check of eqn ($\ref{eqn:congmod4-1}$) in Python like so

```py
f = lambda n: (-3+(-1)**n+1j*(-((-1+1j)*(-1j)**n)-1j**n*(1+1j))+4*n)/2
[f(n) for n in range(10)]
# Outputs [0j, (1+0j), (2+0j), (3+0j), (8+0j), (9+0j), (10+0j), (11+0j), (16+0j), (17+0j)]
```

This sequence is formally known as _numbers that are congruent to $\\{0,1,2,3\\}\\!\\!\mod{8}$_.

However, I am still not quite satiated by this form because of two reasons: (1) it uses the imaginary number $i$ to produce purely real results and (2) I couldn't find a way to generalise the form to give numbers that are congruent to $\\{0,1,\ldots,2^k-1\\}\\!\\!\mod{2^k}$, which as far as I know, is a generalised sequence that is not documented anywhere.

## Generalised formula for numbers that are congruent to $\\{0,1,\ldots,2^k-1\\}\\!\\!\mod{2^k}$

Then, while browsing OEIS unsuspectingly, I stumbled upon the sequence A042948[^A042948], which happened to contain the following formula for generating numbers that are congruent to $\\{0,1\\}\\!\\!\mod{2}$

$$
a_n=2n - (n\\!\\!\\!\\!\mod{2}).\label{eqn:congmod2}
$$

After fiddling around with eqn ($\ref{eqn:congmod2}$) in Wolfram Mathematica, I found out that by performing a rudimentary modification that I'd achieve what I want

$$
\boxed{a_{n,k}=2n - (n\\!\\!\\!\\!\mod{2^k}).}\label{eqn:congmod2k}
$$

You might be wondering,

> Hmm, is this useful in any practical applications?

This is a question that I'd like you to ponder about. But if you're impatient, then here is my answer: _yes_. One application that I found with this, without going too much into details, is performing highly efficient symmetric matrix operations (_maybe I'll talk about this in a future blog in more detail_). Perhaps there are other applications that have yet to be discovered/documented. I'm also sure that this sequence is quite interesting in number theory, however, I am but a physicist and not a mathematician. I'll leave that up to you, the reader, to find out. 😊

Thus, with eqn ($\ref{eqn:congmod2k}$), I have obtained my holy grail for _"Cool number sequence #0"_.

## `C/C++` implementation

Below is a low-level `C/C++` implementation for the curious

```c
// In binary algebra, you can rewrite `n mod 2^k` as `n & ((1<<k)-1)`
// where `&` is the `bit and` operator
// and `<<` is the `bit left shift` operator
int congMod(int n, int k) {
    return 2*n - (n & ((1 << k) - 1));
}
```

[^A047454]: https://oeis.org/A047454
[^A042948]: https://oeis.org/A042948
[^mscthesis]: https://repository.tudelft.nl/islandora/object/uuid:649f5fe9-0266-4be2-a3a5-4b5ffd13073e

<!-- id MathJax-Element-2-Frame -->
<!-- span class MathJax > span class MJX_Assistive_MathML > math > mrow class MathJax_ref > mtext -->
