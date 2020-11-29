---
title: "Python Cheatsheet"
weight: 1
---

La librairie Python `scipy` contient tous les outils nécessaire pour l'analyse et l'implémentation des filtres. 
La fonction `dlti` permet la création de filtre numérique à partir de la forme polynomiale ou factorisée (voir [doc](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.dlti.html)). 


## Implémentation d'un filtre

Un filtre peut être implémenté par une récurrence. La fonction scipy `dfilter` permet d'obtenir la sortie d'un filtre lorsque l'entrée est une liste `x` (ou un tableau `numpy`). La sortie est calculée en appelant des fonctions codées en C.

{{< highlight python >}}
from scipy import signal

x = [1,0,0,1,0,0.4]
bn = [0.065,0.13,0.065]
an = [1,-1.143,0.413]

y = signal.lfilter(bn,an,x)
{{< / highlight >}}

## Pôles et zéros

Les pôles et les zéros sont des attributs de l'objet `dlti`.

### Calcul

{{< highlight python >}}
from scipy import signal

H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

print("Poles : {}".format(H.poles))
print("Zeros : {}".format(H.zeros))
{{< / highlight >}}

### Affichage avec Matplotlib

{{< highlight python >}}
import matplotlib.pyplot as plt
from scipy import signal

H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])
plt.plot(np.real(H.poles),np.imag(H.poles),"x")
plt.plot(np.real(H.zeros),np.imag(H.zeros),"o")
{{< / highlight >}}

## Réponses Temporelles

Les réponses temporelles (impulsionnelle, indicielle) s'obtiennent facilement en utilisant les méthodes `impulse` ou `step` de l'objet `lti`. Ces méthodes renvoient deux tableaux `numpy`.

### Réponse Impulsionnelle

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

n, y = H.impulse()
plt.step(n, np.squeeze(y))
plt.grid()
plt.xlabel('n [samples]')
plt.ylabel('h[n]')
{{< / highlight >}}

### Réponse indicielle

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

n, y = H.step()
plt.step(n, np.squeeze(y))
plt.grid()
plt.xlabel('n [samples]')
plt.ylabel('Amplitude')
{{< / highlight >}}


## Réponse Fréquentielle
La réponse fréquentielle s'obtient facilement en utilisant la méthode `freqresp` de l'objet `lti`. Cette méthode renvoie deux tableaux `numpy`.


{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

w, Hjw = H.freqresp()
modulus = np.abs(Hjw)
argument = np.angle(Hjw)

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