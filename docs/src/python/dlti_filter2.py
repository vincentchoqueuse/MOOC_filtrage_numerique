import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.colors as colors
from matplotlib import cm
import numpy as np
import os

#create system
num = [0.065,0.13,0.065]
den = [1,-1.143,0.413]

x = np.arange(-2,2,0.01)
y = np.arange(-2,2,0.01)
abs_H = np.zeros((len(x),len(y)))

for index_x,x_temp in enumerate(x):
    for index_y,y_temp in enumerate(y):
        z = x_temp+1j*y_temp 
        abs_H[index_x,index_y] = np.abs(np.polyval(num,z)/np.polyval(den,z))

#plot poles and zeros
X,Y = np.meshgrid(x,y)
fig = plt.figure()
ax = fig.gca(projection='3d')
ax.plot_surface(X, Y, abs_H, norm=colors.LogNorm(vmin=0.001,vmax=2),cmap=cm.Blues,rstride=1,cstride=1)
ax.view_init(elev=44,azim=45)

plt.ylabel("Real Part")
plt.xlabel("Imaginary Part")

filename = os.path.basename(__file__).replace(".py","")
plt.savefig("../../img/{}.png".format(filename)) 
