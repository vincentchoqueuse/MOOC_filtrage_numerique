yn = [0,0,0]
xn = [0,0,0]

x_input= [1,0,1,0,0,0,0]
y_output = [0]*8
for n in range(len(x_input)):
    xn[0] = x_input[n]
    y_output[n] = 0.065*xn[0]+0.13*xn[1]+0.065*xn[2]+1.143*yn[1]-0.413*yn[2]

    # save old values
    yn[2] = yn[1]
    yn[1] = y_output[n]
    xn[2] = xn[1]
    xn[1] = xn[0]

print(y_output)

from scipy import signal 

y = signal.lfilter([0.065,0.13,0.065],[1,-1.143,0.413],x_input)
print(y)