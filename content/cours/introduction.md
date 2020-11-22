---
title: "Introduction"
weight: 2
---


Un filtre permet de "sculpter" un signal en supprimant ou en accentuant certaines composantes fréquentielles. Alors que les filtres analogiques reposent sur la conception de circuits électroniques, les filtres numériques eux sont souvent plus souples à mettre en oeuvre car ils reposent sur des algorithmes simples. Ces algorithmes peuvent être codés dans n'importe quel langage de programmation même si le C reste la norme pour les applications embarquées. 

Dans ce support de cours, nous allons nous intéresser à la synthèse de filtres numériques à une entrée et une sortie (SISO: Single-Input Single-Output). Ces filtres sont couramment utilisés dans un large panel d'applications pour supprimer de l'information inutile.

## Modélisation

Un filtre numérique peut être modélisé par une fonction mathématique recevant en entrée un signal numérique et renvoyant en sortie un signal numérique. Mathématiquement, un signal numérique est représenté par une suite de nombres où le $n^{ieme}$ nombre de la suite est noté $x[n]$ ($n \in \mathbb{Z}$). 

{{< figure src="/MOOC_filtrage_numerique/img/fig1.svg" title="Filtre LTI" width="450" >}}

Le lien entre l'entrée et la sortie est modélisé via l'opérateur $T\\{.\\}$ c-a-d $y[n]=T\\{x[n]\\}$. Dans ce cours, nous allons nous intéresser à la classe des filtres dits linéaires et invariants dans le temps (LTI).


**Définition** (Filtre LTI)
<div class="propriete">
Un filtre LTI respecte les propriétés suivantes:

* Linéarité: Si l'entrée du filtre est égale à $x[n]=\alpha x_1[n]+\beta x_2[n]$, alors $y[n]=\alpha y_1[n]+\beta y_2[n]$.
* Invariance dans le temps: Si l'entrée du filtre est égale à $x[n]=x_1[n-\tau]$ ($\tau \in \mathbb{Z}$), alors $y[n]=y_1[n-\tau]$.
</div>

En utilisant les deux propriétés précédentes, il est possible d'établir que la sortie du filtre s'exprime à partir d'un produit de convolution.

**Propriété**
<div class="propriete">
Lorsqu'un signal $x[n]$ est envoyé à l'entrée d'un filtre LTI, la sortie s'exprime sous la forme
$$y[n]=\mathcal{T}\{x[n]\}=\sum_{k=-\infty}^{\infty}h[k]x[n-k]=x[n]*h[n]$$
où $*$ désigne le produit de convolution et $h[n]$ désigne la réponse impulsionnelle du filtre.
</div>

Cette propriété montre que le comportement d'un filtre LTI est entièrement décrit par sa réponse impulsionnelle. La réponse impulsionnel d'un filtre s'obtient en envoyant en entrée une impulsion c-a-d $h[n]=\mathcal{T}\\{\delta[n]\\}$. 


Certains filtres LTI peuvent se modéliser par une équation aux différences liant l'entrée et la sortie.

**Définition** (Equation aux différences)
<div class="definition" id="eq_dif">
L'équation aux différences est modélisée par 
$$y[n]=\sum_{m=0}^{M}b_m x[n-m]-\sum_{l=1}^{L}a_l y[n-l].$$
</div>

Dans l'équation aux différences :

* les coefficients réels $b_m$ correspondent à la partie non-récursive du filtre,
* les coefficients réels $a_l$ correspondent à la partie récursive du filtre.

Dans l'équation aux différences, notons que le coefficient multipliant $y[n]$ est implicitement égal à $a_0=1$. L'ordre $N$ d'un filtre est défini comme étant la plus grande valeur entre $M$ et $L$ c-a-d $N=\max(M,L)$.

Pour illustrer le contenu de ce chapitre, nous allons considérer le filtre d'ordre 2 suivant.

**Exemple** (Filtre 1)
<div class="exemple">
Le filtre 1 est décrit par l'équation aux différences 
$$
\begin{aligned}
y[n]&=0.065x[n]+0.13 x[n-1]+0.065x[n-2]\\
&~~~+1.143y[n-1]-0.413y[n-2]
\end{aligned}
$$
</div>

Pour le filtre 1, nous trouvons par identification :

* $b_0=0.065$, $b_1=0.13$ et $b_2=0.065$,
* $a_0=1$, $a_1=-1.143$ et $a_2=0.413$.

Un filtre régit par une équation aux différences peut être implémenté facilement en utilisant une récurrence. A titre d'exemple, la code suivant montre une implémentation possible (et complètement non optimisée) en Python.

{{< highlight python >}}
x = [0,0,1,0,1,0,0,0,0]
y = [0,0,0,0,0,0,0,0,0]

for n in range(2,9):
    y[n] = 0.065*x[n]+0.13*x[n-1]+0.065*x[n-2]+1.143*y[n-1]-0.413*y[n-2]

{{< / highlight >}}

## Filtres FIR et IIR

La réponse impulsionnelle d'un filtre décrit par une équation aux différences s'obtient de manière recursive en prenant comme entrée $x[n]=\delta[n]$ et en fixant $y[n]=0$ pour $n<0$. Il est alors possible de définir deux grandes catégories de filtres :

* Les filtres à **Réponse Impulsionnelle Finie (FIR)** pour lesquels $a_l=0$ pour tout $l>0$ c-a-d
$$y[n]=\sum_{m=0}^{M}b_m x[n-m]$$ Pour ce type de filtre, $y[n]$ dépend uniquement des $M$ derniers échantillons d'entrée $x[n-m]$. La réponse impulsionnelle d'un filtre FIR est simplement donnée par 
$h[n]=b_m$. Cette réponse est nécessairement nulle au bout de $M$ échantillons c-a-d $h[n]=0$ pour $n>M$.

* Les filtres à **Réponse Impulsionnelle Infinie (IIR)** pour lesquels il existe au moins une valeur de $l$ telle que $a_l\ne 0$. Pour ce type de filtre, $y[n]$ dépend des $M$ derniers échantillons en entrée et des $L$ dernièrs échantillons en sortie.

## Problématiques

Dans ce document, nous allons traiter les problématiques suivantes.

* Connaissant la valeur des coefficients $b_m$ et $a_l$, est-il possible de comprendre l'effet d'un filtre sur une entrée quelconque $x[n]$ ? 
* Est-il possible de déterminer les coefficients $b_m$ et $a_l$ d'un filtre à partir d'un ensemble de spécifications fréquentielles ou temporelles ?
