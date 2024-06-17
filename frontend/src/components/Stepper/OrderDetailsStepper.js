import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const steps = [
    'pending',
    'placed',
    'confirmed',
    'preparing',
    'ready',
    'on the way',
    'delivered',
];

export default function OrderDetailsStepper({ status }) {
    console.log('status', status);
    const getStatusIndex = (status) => {
        return steps.indexOf(status.toLowerCase());
    };

    const activeStep = getStatusIndex(status);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Box sx={{ width: '100%', p: { xs: 1, sm: 2 } }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconProps={{
                                    sx: {
                                        '&.Mui-completed': { color: '#007676' },
                                        '&.Mui-active': { color: '#007676' },
                                        '&.Mui-disabled': { color: 'grey' },
                                    }
                                }}
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            color: '#333 !important'
                                        }
                                    }}>
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        sx={{
                                            fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Grid>
        </Grid>
    );
}
