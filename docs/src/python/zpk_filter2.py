import matplotlib.pyplot as plt
import numpy as np
from scipy import signal

#create system
H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

#add stability limit
angle = np.linspace(0, 2 * np.pi, 100)

#plot poles and zeros
plt.plot(np.cos(angle),np.sin(angle),'k--')
plt.plot(H.zeros.real,H.zeros.imag, 'o', markersize=10.0)
plt.plot(H.poles.real,H.poles.imag, 'x', markersize=10.0)
plt.axis('equal')
plt.xlabel("Real Part")
plt.ylabel("Imaginary Part")
plt.savefig("./zpk_filter2.svg") # export
plt.show()