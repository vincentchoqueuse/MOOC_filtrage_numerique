---
title: "Python Cheatsheet"
weight: 1
---

La librairie Python `scipy` contient tous les outils nécessaire pour l'analyse et l'implémentation des filtres. 
La fonction `dlti` permet la création de filtre numérique à partir de la forme polynomiale ou factorisée (voir [doc](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.dlti.html)). Dans cette "cheatsheet", nous utilisons toutefois essentiellement des fonction `numpy` pour l'analyse des filtres afin de rendre le lien entre le cours et l'implémentation plus explicite.

{{< highlight python >}}
b = [0.065,0.13,0.065]
a = [1,-1.143,0.413]
{{< / highlight >}}



## Implémentation d'un filtre

Un filtre peut être implémenté par une récurrence. La fonction scipy `dfilter` permet d'obtenir la sortie d'un filtre lorsque l'entrée est une liste `x` (ou un tableau `numpy`). La sortie est calculée en appelant des fonctions codées en C.

{{< highlight python >}}
from scipy import signal

x = [1,0,0,1,0,0.4]
y = signal.lfilter(b,a,x)
{{< / highlight >}}

## Pôles et zéros

Les pôles et les zéros peuvent s'obtenir en utilisant la fonction `roots` de numpy.

### Calcul

{{< highlight python >}}
import numpy as np

zeros = np.roots(b)
poles = np.roots(a)

print("Poles : {}".format(poles))
print("Zeros : {}".format(zeros))
{{< / highlight >}}

### Affichage avec Matplotlib

{{< highlight python >}}
import matplotlib.pyplot as plt
from scipy import signal

zeros = np.roots(b)
poles = np.roots(a)

plt.plot(np.real(poles),np.imag(poles),"x")
plt.plot(np.real(zeros),np.imag(zeros),"o")
{{< / highlight >}}

## Réponses Temporelles

Les réponses temporelles (impulsionnelle, indicielle) s'obtiennent facilement en utilisant la méthodes `lfilter` 

### Réponse Impulsionnelle

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

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

n = np.arange(10)
step = 1.0*(n>=0)
y = signal.lfilter(b,a,step)

plt.stem(n, y)
plt.grid()
plt.xlabel('n [samples]')
plt.ylabel('s[n]')
{{< / highlight >}}


## Réponse Fréquentielle
La réponse fréquentielle s'obtient facilement en utilisant la méthode `freqz` (https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.freqz.html#scipy-signal-freqz). 


{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

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