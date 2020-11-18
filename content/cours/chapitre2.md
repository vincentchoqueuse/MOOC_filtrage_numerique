---
title: "Analyse Fréquentielle"
weight: 4
---

Le domaine fréquentielle est un domaine particulièrement utilisé pour analyser le comportement des filtres LTI. Le succès de ce domaine d'analyse est principalement lié à la propriété suivante.

**Propriété** 
<div class="propriete">
La réponse d'un filtre LTI à une exponentielle complexe $x[n]=e^{jn\Omega}$ de pulsation normalisée $\Omega=\omega T_e$ est une exponentielle complexe de même pulsation multipliée par un coefficient complexe :

$$y[n]=H(e^{j\Omega}) e^{jn\Omega} $$

où $H(e^{j\Omega})$ est appelé réponse fréquentielle du système. 
</div>

## Réponse Fréquentielle

Mathématiquement, la réponse fréquentielle d'un filtre LTI de réponse impulsionnelle $h[n]$ est définie par

$$H(e^{j\Omega})=\sum_{n=-\infty}^{\infty} h[n] e^{-jn\Omega}$$

**Propriété** 
<div class="propriete">
La réponse fréquentielle d'un filtre LTI s'obtient en évaluant la fonction de transfert $H(z)$ sur le cercle de rayon unité c-à-d en posant $z=e^{j\Omega}$.
</div>

Comme $H(e^{j\Omega})=H(e^{j(\Omega+2k\pi)})$ ($k \in \mathbb{Z}$), la réponse fréquentielle est $2\pi$-périodique. De plus, lorsque $h[n]\in \mathbb{R}$, il est possible de démontrer que $H(e^{j\omega})=H^{*}(e^{-j\omega})$ (symétrie hermitienne). 


## Représentation 

La réponse fréquentielle est une quantité généralement complexe. Cette quantité peut se décomposer sous la forme

$$H(e^{j\Omega})=|H(e^{j\Omega})|e^{j\arg[H(e^{j\Omega})]}$$


* $|H(e^{j\Omega})|$ désigne le module de $H(e^{j\Omega})$
* $\arg[H(e^{j\Omega})]$ désigne l'argument de $H(e^{j\Omega})$

Pour analyser le comportement d'un filtre, il est utile de représenter le module et l'argument de la réponse fréquentielle en fonction de $\omega$. L'affichage du module et de l'argument permet d'avoir une interprétation concrète de l'effet du filtre sur une entrée quelconque. En effet à la pulsation $\Omega$, le filtre va appliquer un gain $|H(e^{j\Omega})|$ et un déphasage (retard) $Arg[H(e^{j\Omega})]$. A titre d'illustration, la figure suivante présente le module et l'argument de la réponse fréquentielle du filtre 1. Nous observons que le filtre se comporte comme un filtre passe-bas. Notons que lorsque l'argument est égal à $Arg[H(e^{j\omega})]=-\omega \tau$, ce qui n'est pas le cas ici, le filtre est dit à phase linéaire. En pratique, cette propriété est souvent recherchée car elle évite la présence de distorsion de phase.

{{< figure src="/MOOC_filtrage_numerique/img/freqresp_filter2.svg" title="Réponse fréquentielle du filtre 1" width="960" >}}
