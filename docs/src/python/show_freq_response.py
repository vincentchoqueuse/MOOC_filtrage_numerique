
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

w, Hjw = H.freqresp()
modulus = np.abs(Hjw)
argument = np.angle(Hjw)

plt.figure(figsize=(15, 5),)
plt.subplot(1,2,1)
plt.plot(w,modulus)
plt.grid()
plt.xlabel('$\Omega$')
plt.ylabel('Modulus')
plt.subplot(1,2,2)
plt.plot(w,argument)
plt.grid()
plt.xlabel('$\Omega$')
plt.ylabel('Argument')
plt.savefig("./freqresp_filter2.svg") 