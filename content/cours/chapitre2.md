---
title: "Analyse Fréquentielle"
weight: 4
---

Le domaine fréquentiel est un domaine particulièrement utilisé pour analyser le comportement des filtres LTI. Ce domaine présente l'avantage de mettre en évidence l'impact d'un filtre sur le contenu fréquentiel d'un signal.

## Réponse Fréquentielle

La sortie d'un filtre LTI s'exprime comme un produit de convolution entre l'entée $x[n]$ et la réponse impulsionnelle du filtre $h[n]$. Pour certaines entrées, la sortie peut se déterminer plus facilement. En particulier, lorsque l'entrée du filtre est une exponentielle complexe $x[n]=e^{jn\Omega}$ de pulsation normalisée $\Omega=\omega T_e$ [rad/ech], la sortie s'exprime sous la forme :

$$
\begin{aligned}
y[n]&=\sum_{k=-\infty}^{\infty}h[k]x[n-k]\\\ 
&=\sum_{k=-\infty}^{\infty}h[k]e^{j(n-k)\Omega}\\\ 
&=e^{jn\Omega}\sum_{k=-\infty}^{\infty}h[k]e^{-jk\Omega}\\\ 
&=H(e^{j\Omega})x[n]
\end{aligned}
$$

Cette dernière expression montre que les exponentielles complexes sont les fonctions propres du produit de convolution. Le coefficient complexe $H(e^{j\Omega})$ obtenu dans la dernière égalité est appelé **réponse fréquentielle** du filtre.

**Propriété** 
<div class="propriete">
La réponse fréquentielle d'un filtre LTI s'obtient en évaluant la fonction de transfert $H(z)$ sur le cercle de rayon unité c-à-d en posant $z=e^{j\Omega}$ and $\Omega=\omega T_e$.
</div>

**Remarques**
* Périodicité : la réponse fréquentielle est $2\pi$-périodique ($H(e^{j\Omega})=H(e^{j(\Omega+2k\pi)})$ pour tout $k \in \mathbb{Z}$).
* Symétrie Hermitienne : Lorsque $h[n]\in \mathbb{R}$, $H(e^{j\omega})=-H^{*}(e^{-j\omega})$.


## Représentation 

La réponse fréquentielle est une quantité généralement complexe. Cette quantité peut se décomposer sous la forme

$$H(e^{j\Omega})=|H(e^{j\Omega})|e^{j\arg[H(e^{j\Omega})]}$$


* $|H(e^{j\Omega})|$ désigne le module de $H(e^{j\Omega})$
* $\arg[H(e^{j\Omega})]$ désigne l'argument de $H(e^{j\Omega})$

Pour analyser le comportement d'un filtre, il est utile de représenter le module et l'argument de la réponse fréquentielle en fonction de $\Omega$. L'affichage du module et de l'argument permet d'avoir une interprétation concrète de l'effet du filtre sur le contenu fréquentiel d'une entrée quelconque. En effet à la pulsation $\Omega$, le filtre va appliquer un gain $|H(e^{j\Omega})|$ et un déphasage $Arg[H(e^{j\Omega})]$. 

A titre d'illustration, la figure suivante présente le module et l'argument de la réponse fréquentielle du filtre 1. Nous observons que le filtre se comporte comme un filtre passe-bas. Nous pouvons également noté la présence de distorsion de phase puisque la phase n'est pas linéaire en fonction de la pulsation.

<div class="row">
    <div class="col-6 ">
{{< figure src="/MOOC_filtrage_numerique/img/freq_response_abs.svg" title="Réponse fréquentielle : Module filtre 1" width="100%" >}}
    </div>
    <div class="col-6" >
{{< figure src="/MOOC_filtrage_numerique/img/freq_response_angle.svg" title="Réponse fréquentielle : Argument du filtre 1" width="100%" >}}
    </div>
</div>
