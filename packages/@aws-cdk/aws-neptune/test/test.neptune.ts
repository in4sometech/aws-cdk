import ec2 = require('@aws-cdk/aws-ec2');
import rds = require('@aws-cdk/aws-rds');
import cdk = require('@aws-cdk/cdk');
import { Test } from 'nodeunit';
import { NeptuneDatabase } from '../lib';

exports = {
    'check that instantiation works'(test: Test) {
        const stack = new cdk.Stack();

        const vpc = new ec2.VpcNetwork(this, 'VPC');

        new NeptuneDatabase(stack, 'Database', {
            masterUser: {
                username: new rds.Username('admin'),
                password: new rds.Password('tooshort'),
            },
            instanceProps: {
                instanceType: new ec2.InstanceTypePair(ec2.InstanceClass.Burstable2, ec2.InstanceSize.Small),
                vpc
            }
        });

        test.done();
    }
};
