---
title: "Python Cheatsheet"
weight: 1
---



## Affichage d'une sinusoïde 

{{< highlight python >}}
import numpy as np
import matplotlib.pyplot as plt

Fs = 1000 # sampling frequency
n = np.arange(Fs)
t = n/Fs
x = np.sin(2*np.pi*10*t)

#plot curve
plt.plot(t,x)
plt.xlabel("t [s]")
plt.ylabel("amplitude")
{{< / highlight >}}

