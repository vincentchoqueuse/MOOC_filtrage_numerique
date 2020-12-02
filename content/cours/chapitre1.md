---
title: "Analyse dans le domaine en Z"
weight: 3
---

Dans cette section, nous allons introduire les outils nécessaires pour l'analyse des filtres numériques. 

## Transformée en Z

**Définition** (Transformée en $\mathcal{Z}$)
<div class="definition">
La transformée en $\mathcal{Z}$ d'une suite numérique $x[n]$ est définie par l'équation
$$X(z)\triangleq \sum_{n=-\infty}^{\infty}x[n]z^{-n}$$
où $z$ est une variable complexe.
</div>

Il est important de noter que la transformée de $\mathcal{Z}$ d'un signal ne converge pas nécessairement pour tout $z \in \mathbb{Z}$. Il est alors nécessaire de préciser la région de convergence (ROC) pour laquelle la série converge c-a-d les valeurs de $z$ telles que $|X(z)|<\infty$. A titre d'illustration, le tableau suivant présente les transformées en $\mathcal{Z}$ de plusieurs signaux et leurs régions de convergence associées.


<div class="custom-table">

| Modèle de Signal  | Transformée en $\mathcal{Z}$  |  Région de Convergence | 
|---|---|---|
| $\delta[n]$  |  $1$  | $z \in \mathbb{Z}$| 
| $\delta[n-m]$ | $z^{-m}$ | $z \ne 0$ |
| $u[n]$ | $\frac{1}{1-z^{-1}}$ | $\|z\|>1$ |
| $a^n u[n]$ | $\frac{1}{1-az^{-1}}$ | $\|z\|>\|a\|$ |
| $na^n u[n]$ | $\frac{az^{-1}}{(1-az^{-1})^2}$ | $\|z\| > \|a\|$ | 
| $\cos (\omega_0 n)u[n]$ | $\frac{1-\cos(\omega_0)z^{-1}}{1-2\cos(\omega_0)z^{-1}+z^{-2}}$ | $\|z\| > 1$ | 
| $\sin (\omega_0 n)u[n]$ | $\frac{\sin(\omega_0)z^{-1}}{1-2\cos(\omega_0)z^{-1}+z^{-2}}$ | $\|z\| > 1$ |
| $r^n\cos (\omega_0 n)u[n]$ | $\frac{1-r\cos(\omega_0)z^{-1}}{1-2r\cos(\omega_0)z^{-1}+r^2z^{-2}}$ | $\|z\| > r$ | 
| $r^n\sin (\omega_0 n)u[n]$ | $\frac{r\sin(\omega_0)z^{-1}}{1-2r\cos(\omega_0)z^{-1}+r^2z^{-2}}$ | $\|z\| > r$ |

<figcaption>
<h4>Quelques transformée en $\mathcal{Z}$ </h4></figcaption>
</div>

**Propriétés** 
<div class="propriete">
 La transformée en $\mathcal{Z}$ possède les propriétés suivantes: 
<br>
<br>

* Linéarité: Si $y[n]=\alpha x_1[n]+\beta x_2[n]$, alors $Y(z)=\alpha X_1(z)+\beta X_2(z)$.
* Décalage temporel: Si $y[n]=x[n-\tau]$ ($\tau \in \mathbb{Z}$), alors $Y(z)=X(z)z^{-\tau}$.
* Multiplication par une fonction exponentielle: Si $y[n]= a^n x[n]$, alors $ Y(z)=X(z/a)$.
* Convolution: Si $y[n]= h[n]*x[n]$, alors $ Y(z)=H(z)X(z)$.
* Théorème de la valeur finale: $\lim_{n\to \infty} x[n]=\lim_{z\to 1}(z-1)X(z)$.
</div>

La propriété liée au décalage temporel indique qu'un retard d'un échantillon dans le domaine temporel revient à multiplier la transformée en $\mathcal{Z}$ par $z^{-1}$. En utilisant cette propriété, l'équation aux différences peut être représentée graphiquement par un schéma bloc où les blocs de fonction de transfert $z^{-1}$ symbolisent un retard d'un échantillon. A titre d'exemple, les figures suivantes présentent deux schéma-blocs possibles pour l'implémentations du filtre 1. Le second schéma-bloc permet d'économiser 2 cellules de retard.



<div class="row">
    <div class="col-6 ">
    {{< figure src="/MOOC_filtrage_numerique/img/fig2.svg" title="Schéma bloc du filtre 1 (Direct Form I)" width="450" >}}
    </div>
    <div class="col-6" >
    {{< figure src="/MOOC_filtrage_numerique/img/fig2b.svg" title="Schéma bloc du filtre 1 (Direct Form II)" width="450" >}}
    </div>
</div>


## Fonction de transfert

La transformée en $\mathcal{Z}$ permet de transformer un produit de convolution en un produit simple. Dans le domaine en $\mathcal{Z}$, la sortie s'exprime alors simplement comme le produit de la transformée en $\mathcal{Z}$ de la réponse impulsionnelle et de la transformée en $\mathcal{Z}$ de l'entrée c-a-d $Y(z)=H(z)X(z)$. La transformée en $\mathcal{Z}$ de la réponse impulsionnelle est appelé fonction de transfert du filtre. 


**Définition** (Fonction de Transfert)
<div class="definition">
La fonction de transfert d'un filtre correspond à la transformée en $\mathcal{Z}$ de sa réponse impulsionnelle c-a-d

$$H(z)=\sum_{n=-\infty}^{\infty}h[n]z^{-n}$$
</div>

Pour un filtre décrit par une équation aux différences, il est également possible d'obtenir rapidement la fonction de transfert en exploitant la propriété de linéarité et de décalage temporel. Dans le domaine en $\mathcal{Z}$, nous obtenons


$$
\begin{aligned}
Y(z)&=\sum_{m=0}^{M}b_m z^{-m} X(z)-\sum_{l=1}^{L}a_l z^{-l}Y(z)\\\ 
Y(z)\left(\sum_{l=0}^{L}a_l z^{-l}\right)&=X(z)\left(\sum_{m=0}^{M}b_m z^{-m}\right) \\\ 
\end{aligned}
$$
avec $a_0=1$. En utilisant le fait que $H(z)=Y(z)/X(z)$, nous obtenons finalement la propriété suivante.

**Propriété** 
<div class="propriete">
La fonction de transfert d'un filtre numérique décrit par une <a href="{{< ref "introduction.md#eq_dif" >}}">équation aux différences</a> s'exprime sous la forme d'une fraction de polynômes en $\mathcal{Z}$

$$H(z)=\frac{B(z)}{A(z)}=\frac{\sum_{m=0}^{M}b_m z^{-m}}{\sum_{l=0}^{L}a_l z^{-l}}$$
</div>

Notons que pour un filtre FIR, $A(z)=1$ et la fonction de transfert est simplement égale à $H(z)=B(z)$.

**Exemple** (Filtre 1)
<div class="exemple">
A titre d'exemple, il est possible de montrer que la fonction de transfert du filtre 1 est donnée par 

$$H(z)=\frac{0.065+0.13 z^{-1}+0.065z^{-2}}{1-1.143z^{-1}+0.413z^{-2}}.$$
</div>

La figure suivante présente le module de la fonction de transfert, $|H(z)|$, pour le filtre 1. Cette figure montre que le module de la fonction de transfert possède des "pics" et des "vallées". 

{{< figure src="/MOOC_filtrage_numerique/img/dlti_filter2.png" title="Module de la fonction de transfert $H(z)$" width="550" >}}


## Pôles et Zéros

Pour mettre en évidence le relief de la fonction de transfert, il est possible de réexprimer la fonction de transfert sous une forme factorisée. 

**Définition** (Pôles et Zéros)
<div class="definition">
Une fonction de transfert peut s'exprimer sous forme factorisée de la manière suivante

$$H(z)=K\frac{\prod_{m=1}^{M}(1-z_m z^{-1})}{\prod_{l=1}^{L}(1-p_l z^{-1})}$$
</div>

* Les valeurs $z_m$ correspondent aux zéros de la fonction de transfert ($H(z_m)=0$).
* Les valeurs $p_l$ correspondent aux poles de la fonction de transfert ($H(z)=\pm \infty$).
* $K$ est un facteur d'amplification.


En pratique, les pôles et les zéros s'obtiennent le plus souvent en utilisant des outils numériques. Une fois calculés, il est courant de représenter les pôles et les zéros dans le plan complexe. Par convention, les pôles sont indiqués avec un $\times$ et les zéros avec un $\circ$. La figure suivante présente la localisation des pôles et des zéros pour le filtre 1. Notons que comme les coefficients $a_l$ et $b_m$ sont réels, les pôles et zéros complexes sont nécessairement purement réels ou complexes-conjugués. 


**Exemple** (Filtre 1)
<div class="exemple">
Le filtre 1 possède un zéro double en $z=-1$ et deux pôles complexes-conjugués en $z=0.57\pm 0.29j$. La fonction de transfert peut se reexprimer sous la forme factorisée suivante :

$$H(z)=0.065\frac{(1+z^{-1})(1+z^{-1})}{(1-(0.57+0.29j)z^{-1})(1-(0.57-0.29j)z^{-1})}$$

Les pôles et les zéros de ce filtre sont représentés dans la figure suivante. 
</div>

{{< figure src="/MOOC_filtrage_numerique/img/zpk_filter2.svg" title="Pôles et Zéros du Filtre 2" width="450" >}}


## Stabilité

Il existe plusieurs définitions de la stabilité. Dans ce cours, nous utiliserons la notion de stabilité au sens BIBO (Bounded-Input Bounded-Output). 

**Définition** (BIBO Stable)
<div class="definition">
Un filtre est dit BIBO stable lorsque pour une entrée $x[n]$ bornée la sortie $y[n]$ est également bornée c-à-d

$$|y[n]|\le y_{max}<\infty$$
</div>

Il est possible d'établir un lien direct entre la stabilité au sens BIBO est la réponse impulsionnelle $h[n]$ du filtre. Notons $|x[n]|\le x_{max}$ où $x_{max}$ désigne le maximum de $|x[n]|$. Comme la sortie s'exprime sous la forme $y[n]=h[n]*x[n]$, nous obtenons

$$
\begin{aligned}
|y[n]|&=\left|\sum_{k=-\infty}^{\infty} h[k]x[n-k]\right| \\\ 
&\le \sum_{k=-\infty}^{\infty} |h[k]||x[n-k]| \\\ 
&\le x_{max} \sum_{k=-\infty}^{\infty} |h[k]| \\\ 
\end{aligned}
$$

Lorsque l'entrée est bornée, nous avons $x_{max}< \infty$. Sous l'hypothèse additionnelle que la réponse impulsionnelle est absolument sommable, nous en déduisons que $|y[n]|<\infty$ et donc que la sortie est bornée.

**Propriété** (BIBO Stable)
<div class="definition">
Pour qu'un filtre soit BIBO stable, une condition suffisante est que la réponse impulsionnelle soit absolument sommable c-a-d 
$$\sum_{n=-\infty}^{\infty}|h[n]|<\infty.$$
</div>

Il est également possible d'établir une condition portant sur la localisation des pôles $p_l$ de $H(z)$. Nous retiendrons en particulier la propriété suivante.

**Propriété** (Stabilité)
<div class="propriete">Un filtre est stable si tous les pôles de sa fonction de transfert sont inclus dans le cercle de rayon unité c-a-d si, pour tout $l$
$$|p_l|\le 1.$$
</div>
