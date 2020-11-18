
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

#create system
H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

# step response
n, y = H.step()
plt.step(n, np.squeeze(y))
plt.grid()
plt.xlabel('n [samples]')
plt.ylabel('Amplitude')
plt.show()