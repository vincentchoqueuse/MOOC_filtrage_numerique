---
title: "Python Cheatsheet"
weight: 1
---

La librairie Python `scipy` contient tous les outils nécessaire pour l'analyse et l'implémentation des filtres. 
La fonction `dlti` permet la création de filtre numérique à partir de la forme polynomiale ou factorisée (voir [doc](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.dlti.html)). Dans cette "cheatsheet", nous utilisons toutefois essentiellement des fonction `numpy` pour l'analyse des filtres afin de rendre le lien entre le cours et l'implémentation plus explicite.

## Implémentation d'un filtre

Un filtre peut être implémenté par une récurrence. La fonction scipy `dfilter` permet d'obtenir la sortie d'un filtre lorsque l'entrée est une liste `x` (ou un tableau `numpy`). La sortie est calculée en appelant des fonctions codées en C.

{{< highlight python >}}
from scipy import signal

x = [1,0,0,1,0,0.4]
b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

y = signal.lfilter(b,a,x)
{{< / highlight >}}

## Pôles et zéros

Les pôles et les zéros peuvent s'obtenir en utilisant la fonction `roots` de numpy.

### Calcul

{{< highlight python >}}
import numpy as np

b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

zeros = np.roots(b)
poles = np.roots(a)

print("Poles : {}".format(poles))
print("Zeros : {}".format(zeros))
{{< / highlight >}}

### Affichage avec Matplotlib

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

zeros = np.roots(b)
poles = np.roots(a)

plt.plot(np.real(poles),np.imag(poles),"x")
plt.plot(np.real(zeros),np.imag(zeros),"o")
{{< / highlight >}}

## Réponses Temporelles

Les réponses temporelles (impulsionnelle, indicielle) s'obtiennent facilement en utilisant la méthode `lfilter`. 

### Réponse Impulsionnelle

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

n = np.arange(10)
impulse = 1.0*(n==0)
h = signal.lfilter(b,a,impulse)

plt.stem(n, h)
plt.grid()
plt.xlabel('n [samples]')
plt.ylabel('h[n]')
{{< / highlight >}}

### Réponse indicielle

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

n = np.arange(10)
step = 1.0*(n>=0)
y = signal.lfilter(b,a,step)

plt.stem(n, y)
plt.grid()
plt.xlabel('n [samples]')
plt.ylabel('s[n]')
{{< / highlight >}}

### Réponse à une sinusoïde.

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

n = np.arange(20)
Fs = 50
x = np.sin(2*np.pi*5*n/Fs)
y = signal.lfilter(b,a,x)

plt.stem(n, y)
plt.grid()
plt.xlabel('n [samples]')
plt.ylabel('sinewave')
{{< / highlight >}}



## Réponse Fréquentielle
La réponse fréquentielle s'obtient facilement en utilisant la méthode `freqz` (https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.freqz.html#scipy-signal-freqz). 


{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

w,H = signal.freqz(b,a)
modulus = np.abs(H)
argument = np.angle(H)

plt.figure()
plt.subplot(1,2,1)
plt.plot(w,modulus)
plt.xlabel('$\Omega$')
plt.ylabel('Modulus')
plt.subplot(1,2,2)
plt.plot(w,argument)
plt.xlabel('$\Omega$')
plt.ylabel('Argument')
{{< / highlight >}}

## Décomposition

La décomposition en élements simples s'obtient en utilisant la fonction `residuez`(https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.residuez.html?highlight=residue#scipy.signal.residuez)

{{< highlight python >}}
from scipy import signal

b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]

r,p,k = signal.residuez(b,a)

{{< / highlight >}}