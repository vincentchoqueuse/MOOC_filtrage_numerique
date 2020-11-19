
import os
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

filename = os.path.basename(__file__).replace(".py","")

H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

w, Hjw = H.freqresp()
modulus = np.abs(Hjw)
argument = np.angle(Hjw)

plt.figure()
plt.plot(w,modulus)
plt.grid()
plt.xlabel('$\Omega$')
plt.ylabel('Modulus')
plt.xlim([0,np.pi])

plt.savefig("../../img/{}_abs.svg".format(filename)) 

plt.figure()
plt.plot(w,argument)
plt.grid()
plt.xlabel('$\Omega$')
plt.ylabel('Argument')
plt.xlim([0,np.pi])

plt.savefig("../../img/{}_angle.svg".format(filename)) 
