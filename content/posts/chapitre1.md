---
title: "Analyse des filtres LTI"
weight: 3
---


Dans cette section, nous allons introduire les outils nécessaires pour l'analyse des filtres numériques. Pour illustrer le contenu de cette section, nous allons considérer un exemple de filtre d'ordre 2.

**Exemple** (Filtre 1)
<div class="exemple">
Le filtre 1 est décrit par l'équation aux différences 
$$
y[n]=0.065x[n]+0.13 x[n-1]+0.065x[n-2]+1.143y[n-1]-0.413y[n-2].
$$
</div>

## Transformée en Z

**Définition** (Transformée en $\mathcal{Z}$)
<div class="definition">
La transformée en $\mathcal{Z}$ d'une suite numérique $x[n]$ est définie par l'équation
$$X(z)\triangleq \sum_{n=-\infty}^{\infty}x[n]z^{-n}$$
où $z$ est une variable complexe.
</div>

Il est important de noter que la transformée de $\mathcal{Z}$ d'un signal ne converge pas nécessairement quelque soit $z \in \mathbb{Z}$. Il est alors nécessaire de préciser la région de convergence (ROC) pour laquelle la série converge c-a-d les valeurs de $z$ telles que $|X(z)|<\infty$. A titre d'illustration, le tableau \ref{app_tabZ} présente les transformées en $\mathcal{Z}$ de plusieurs signaux et leurs regions de convergence associées.

**Propriétés** 
<div class="propriete">
 La transformée en $\mathcal{Z}$ possède les propriétés suivantes (les réciproques étant également vraies):
<br>
<br>

* Linéarité: Si $y[n]=\alpha x_1[n]+\beta x_2[n]$, alors $Y(z)=\alpha X_1(z)+\beta X_2(z)$.
* Décalage temporel: Si $y[n]=x[n-\tau]$ ($\tau \in \mathbb{Z}$), alors $Y(z)=X(z)z^{-\tau}$.
* Multiplication par une fonction exponentielle: Si $y[n]= a^n x[n]$, alors $ Y(z)=X(z/a)$.
* Convolution: Si $y[n]= h[n]*x[n]$, alors $ Y(z)=H(z)X(z)$.
* Théorème de la valeur finale: $\lim_{n\to \infty} x[n]=\lim_{z\to 1}(z-1)X(z)$.
</div>

La propriété liée au décalage temporel indique qu'un retard d'un échantillon dans le domaine temporel revient à multiplier la transformée en $\mathcal{Z}$ par $z^{-1}$. En utilisant cette propriété, l'équation aux différences peut être représentée graphiquement par un schéma bloc où les blocs de fonction de transfert $z^{-1}$ introduisent un retard d'un échantillon. A titre d'exemple, la figure \ref{fig_schema} présente le schéma bloc du filtre~1.


{{< figure src="{{ .Site.BaseURL }}img/fig2.svg" title="Schéma bloc du filtre 1" width="450" >}}


La propriété liée à la convolution montre l'importance de la transformée en $\mathcal{Z}$ de la réponse impulsionnelle, $H(z)$. Cette transformée en $\mathcal{Z}$ est appelé fonction de transfert du filtre. 

**Définition** (Fonction de Transfert)
<div class="definition">
La fonction de transfert d'un filtre correspond à la transformée en $\mathcal{Z}$ de sa réponse impulsionnelle c-a-d

$$H(z)=\sum_{n=-\infty}^{\infty}h[n]z^{-n}$$
</div>

La propriété liée à la convolution montre que la fonction de transfert d'un filtre s'exprime également sous la forme $H(z)=Y(z)/X(z)$. Pour un filtre décrit par une équation aux différences, cette propriété permet d'exprimer la fonction de transfert du filtre en fonction des coefficients des parties récursive $a_l$ et non-recursive $b_m$ du filtre.


**Propriété** 
<div class="propriete">
La fonction de transfert d'un filtre numérique décrit par une équation aux différences s'exprime sous la forme ($a_0\triangleq 1$)

$$H(z)=\frac{\sum_{m=0}^{M}b_m z^{-m}}{\sum_{l=0}^{L}a_l z^{-l}}=\frac{B(z)}{A(z)}$$
</div>

A titre d'exemple, il est possible de montrer que la fonction de transfert du filtre 1 est donnée par 

$$H(z)=\frac{0.065+0.13 z^{-1}+0.065z^{-2}}{1-1.143z^{-1}+0.413z^{-2}}.$$

La figure suivante présente le module de la fonction de transfert, $|H(z)|$, pour le filtre 1. Cette figure montre que le module de la fonction de transfert possède des "pics" et des "vallées". 

{{< figure src="{{ .Site.BaseURL }}img/dlti_filter2.png" title="Module de la fonction de transfert $H(z)$" width="550" >}}


## Pôles et Zéros

Pour mettre en évidence les comportements singuliers de la fonction de transfert, il est possible de réexprimer la fonction de transfert sous une forme factorisée. La forme factorisée donne explicitement les valeurs de $z$ pour lesquelles $H(z)$ tend vers $0$ (zéros) et les valeurs de $z$ pour lesquelles $H(z)$ tend vers l'infini (pôles). 

**Définition** (Pôles et Zéros)
<div class="definition">
Une fonction de transfert peut s'exprimer sous forme factorisée de la manière suivante

$$H(z)=\left(\frac{b_0}{a_0}\right)\frac{\prod_{m=1}^{M}(1-c_m z^{-1})}{\prod_{l=1}^{L}(1-d_l z^{-1})}$$

où les valeurs $c_m$ et $d_l$ correspondent respectivement aux zéros et aux pôles de la fonction de transfert.
</div>


En pratique, les pôles et les zéros s'obtiennent le plus souvent en utilisant des algorithmes numériques. A titre d'illustration, la fonction Python `root` permet d'établir que le filtre 1 possède un zéro double en $z=-1$ et deux pôles complexes conjugués en $z=0.57\pm 0.29j$. Notons que comme les coefficients $a_l$ et $b_m$ sont réels, les pôles et zéros complexes sont nécessairement conjugués. Il est courant de représenter la localisation des pôles et des zéros dans le plan complexe. Par convention, les pôles sont indiqués avec un $\times$ et les zéros avec un $\circ$. La figure \ref{fig_carte_pz} présente la localisation des pôles et des zéros pour le filtre 1.

{{< figure src="{{ .Site.BaseURL }}img/zpk_filter2.svg" title="Pôles et Zéros du Filtre 2" width="450" >}}

La localisation des pôles est directemenet lié à la stabilité du filtre. De manière formelle, un filtre est dit stable si sa réponse impulsionnelle est absolument sommable c-a-d $\sum_{n=-\infty}^{\infty}|h[n]|<\infty$. La propriété suivante montre que cette propriété est directement liée au module des pôles de la fonction de transfert.


**Propriété** (Stabilité)
<div class="propriete">Un filtre est stable si tous les pôles de sa fonction de transfert sont inclus dans le cercle de rayon unité c-a-d si, pour tout $l$
$$|d_l|\le 1.$$
</div>

La figure \ref{fig_pz_imp} présente la localisation des pôles et des zéros ainsi que la réponse impulsionnelle de deux filtres IIR. Le premier filtre est stable car tous ses pôles sont inclus dans le cercle de rayon unité. A l'inverse, le second filtre est instable car il possède un pôle en $z=-1.4$ dont le module est supérieur à 1. Pour ce second filtre, nous constatons que la réponse impulsionnelle semble tendre vers des valeurs infinies.

