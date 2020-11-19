---
title: "Introduction"
weight: 2
---


Un filtre permet de "sculpter" un signal en supprimant ou en accentuant certaines composantes fréquentielles. Alors que les filtres analogiques reposent sur la conception de circuits électroniques, les filtres numériques eux sont souvent plus souples à mettre en oeuvre car ils reposent sur des algorithmes pouvant être codés dans n'importe quel langage de programmation (même si le C reste la norme pour les applications embarquées). Dans ce support de cours, nous allons nous intéresser à la synthèse de filtres numériques à une entrée et une sortie (SISO: Single-Input Single-Output). Ces filtres sont couramment utilisés dans un large panel d'applications. 

## Modélisation

Un filtre numérique peut être modélisé par une fonction mathématique prenant en entrée un signal numérique et renvoyant en sortie un signal numérique. Mathématiquement, un signal numérique est représenté par une suite de nombres où le $n^{ieme}$ nombre de la suite est noté $x[n]$ ($n \in \mathbb{Z}$). 

{{< figure src="/MOOC_filtrage_numerique/img/fig1.svg" title="Filtre LTI" width="450" >}}


Dans ce cours, nous allons nous intéresser à la classe des filtres dits linéaires et invariants dans le temps (LTI). 


**Définition** (Filtre LTI)
<div class="propriete">
Un filtre LTI respecte les propriétés suivantes:

* Linéarité: Si l'entrée du filtre est égale à $x[n]=\alpha x_1[n]+\beta x_2[n]$, alors $y[n]=\alpha y_1[n]+\beta y_2[n]$.
* Invariance dans le temps: Si l'entrée du filtre est égale à $x[n]=x_1[n-\tau]$ ($\tau \in \mathbb{Z}$), alors $y[n]=y_1[n-\tau]$.
</div>

En utilisant les deux propriétés précédentes, il est possible d'établir qu'un filtre LTI est entièrement décrit par sa réponse à une entrée de type impulsion ($x[n]=\delta[n]$). La réponse à une entrée de type impulsion est appelée réponse impulsionnelle et est notée $h[n]$.

Lorsque l'entrée est un signal quelconque, la sortie du filtre s'obtient en utilisant un produit de convolution.

**Propriété**
<div class="definition">
Lorsqu'un signal $x[n]$ est envoyé à l'entrée d'un filtre LTI, la sortie s'exprime sous la forme
$$y[n]=x[n]*h[n] \triangleq \sum_{k=-\infty}^{\infty}x[k]h[n-k]$$
où $*$ désigne le produit de convolution.
</div>

Une grande catégorie de filtres LTI peut se modéliser par une équation aux différences.

**Définition** (Equation aux différences)
<div class="definition" id="eq_dif">
L'équation aux différences est modélisée par 
$$y[n]=\sum_{m=0}^{M}b_m x[n-m]-\sum_{l=1}^{L}a_l y[n-l],$$
</div>

Dans l'équation aux différences :

* les coefficients réels $b_m$ correspondent à la partie non-récursive du filtre,
* les coefficients réels $a_l$ correspondent à la partie récursive du filtre.

Dans l'équation aux différences, notons que le coefficient multipliant $y[n]$ est implicitement égal à $a_0=1$. L'ordre du filtre est défini comme étant la plus grande valeur entre $M$ et $L$. 

## Filtres FIR et IIR

La réponse impulsionnelle d'un filtre décrit par une équation aux différences s'obtient en prenant comme entrée l'impulsion c-a-d $x[n]=\delta[n]$ et en fixant $y[n]=0$ pour $n<0$. Il est alors possible de définir deux grandes catégories de filtres :

* les filtres à Réponse Impulsionnelle Finie (FIR) pour lesquels $a_l=0$ pour tout $l>0$,
* les filtres à Réponse Impulsionnelle Infinie (IIR) pour lesquels il existe au moins une valeur de $l$ ($l>0$) telle que $a_l\ne 0$.

## Problématiques

Dans ce document, nous allons traiter les problématiques suivantes.

* Connaissant la valeur des coefficients $b_m$ et $a_l$, est-il possible de comprendre l'effet d'un filtre sur une entrée quelconque $x[n]$ ? 
* Est-il possible de déterminer les coefficients $b_m$ et $a_l$ d'un filtre à partir d'un ensemble de spécifications fréquentielles ou temporelles ?
