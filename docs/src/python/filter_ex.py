x = [0,0,1,0,1,0,0,0,0]
y = [0,0,0,0,0,0,0,0,0]
for n in range(2,9):
    y[n] = 0.065*x[n]+0.13*x[n-1]+0.065*x[n-2] \
            +1.143*y[n-1]-0.413*y[n-2]

print(y)

from scipy import signal 

y = signal.lfilter([0.065,0.13,0.065],[1,-1.143,0.413],[0,0,1,0,1,0,0,0,0])
print(y)